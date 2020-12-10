import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { TutorialsComponent } from './components/tutorials/tutorials.component';
import { ContentComponent } from './components/content/content.component';

import { NavigationComponent } from './components/navigation/navigation.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { QuoteOfTheDayComponent } from './components/quote-of-the-day/quote-of-the-day.component';
import { ReadingSuggestionComponent } from './components/reading-suggestion/reading-suggestion.component';
import { RandomThoughtsComponent } from './components/random-thoughts/random-thoughts.component';

import { LazyImageLoadingDirective } from './directives/lazy-image-loading.directive';

import { PagingFilterPipe } from './pipes/paging-filter.pipe';
import { SlugPipe } from './pipes/slug.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticlesComponent,
    BookshelfComponent,
    TutorialsComponent,
    ContentComponent,
    NavigationComponent,
    BreadcrumbsComponent,
    PaginationComponent,
    QuoteOfTheDayComponent,
    ReadingSuggestionComponent,
    RandomThoughtsComponent,
    LazyImageLoadingDirective,
    PagingFilterPipe,
    SlugPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
