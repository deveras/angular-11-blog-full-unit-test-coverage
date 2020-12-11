import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BookshelfService } from './../../services/bookshelf.service';
import { TutorialsService } from './../../services/tutorials.service';
import { ArticlesService } from './../../services/articles.service';
import { ArticleModel } from '../../models/article-model';
import { BookModel } from '../../models/book-model';
import { TutorialModel } from '../../models/tutorial-model';
import { ContentNode } from '../../models/content-node';
import { AttributeNode } from '../../models/attribute-node';
import { Subscription } from 'rxjs';


@Component(
  {
    selector: 'blog-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  }
)
export class ContentComponent
  implements OnInit, OnDestroy
{
  private serviceSubscription: Subscription = new Subscription();
  public errorMessage = '';
  public section = '';
  public content: ArticleModel | TutorialModel | BookModel = new ArticleModel();
  public showLoading = true;
  @ViewChild('contentBody') public contentBodyElement: ElementRef = new ElementRef(null);


  constructor(
    private readonly route: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly titleService: Title,
    private readonly renderer: Renderer2,
    private readonly articlesService: ArticlesService,
    private readonly bookshelfService: BookshelfService,
    private readonly tutorialsService: TutorialsService
  ) {}


  public ngOnInit(): void {
    this.section = this.route.snapshot.data.title;
    const serviceName = this.section.toLowerCase() + 'Service';
    let service: ArticlesService | BookshelfService | TutorialsService;

    switch (serviceName) {
      case 'articlesService':
        service = this.articlesService;
        break;
      case 'bookshelfService':
        service = this.bookshelfService;
        break;
      default:
        service = this.tutorialsService;
        break;
    }

    this.serviceSubscription = service.getById( this.route.snapshot.params.id ).subscribe(
      (response: ArticleModel | TutorialModel | BookModel) => {
        this.titleService.setTitle(response.title);
        this.content = response;
        this.showLoading = false;
        this.changeDetectorRef.detectChanges();
        this.renderer.appendChild(
          this.contentBodyElement.nativeElement,
          this.transform(this.content.body)
        );
        this.changeDetectorRef.markForCheck();
      },
      (errorMessage: string) => {
        this.errorMessage = errorMessage;
        this.showLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    );
  }


  public ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
  }


  private prepareChildren(children: ContentNode[], container: ElementRef): ElementRef {
    for (const el of children) {
      if ( this.isTag(el.type) ) {
        if ( this.isNotInvalidTag(el.tag) ) {
          this.renderer.appendChild( container, this.prepareTag(el) );
        }
      } else if (el.content) {
        this.renderer.appendChild( container, this.renderer.createText(el.content) );
      }
    }
    return container;
  }


  private isTag(type: string): boolean {
    return type === 't';
  }


  private isNotInvalidTag(tag: string): boolean {
    const invalidTags: string[] = [ 'script' ];
    if (invalidTags.includes(tag.toLowerCase())) {
      return false;
    }
    return true;
  }


  private prepareTag(el: ContentNode): ElementRef {
    const newElement = this.renderer.createElement(el.tag);
    if (el.classes) { this.renderer.setAttribute(newElement, 'class', el.classes); }

    if (el.attributes){
      this.prepareAttibutes(el.attributes, newElement);
    }

    if (el.content) {
      this.renderer.appendChild(newElement, this.renderer.createText(el.content) );
    }

    if (el.children) {
      this.prepareChildren(el.children, newElement);
    }
    return newElement;
  }


  private prepareAttibutes(els: AttributeNode[], container: ElementRef): void {
    els.forEach( (attribute: AttributeNode) => {
      if (attribute.name.toLowerCase() !== 'style') {
        this.renderer.setAttribute(container, attribute.name, attribute.value);
      }
    });
  }


  private transform(content: string): ElementRef {
    return this.prepareChildren(
      JSON.parse(content),
      this.renderer.createElement('div')
    );
  }

}
