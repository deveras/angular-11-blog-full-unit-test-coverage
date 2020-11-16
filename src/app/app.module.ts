import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from  '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { TutorialsComponent } from './components/tutorials/tutorials.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from './components/pagination/pagination.component';

import { PagingFilterPipe } from './pipes/paging-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    BookshelfComponent,
    TutorialsComponent,
    NavigationComponent,
    BreadcrumbsComponent,
    PaginationComponent,
    PagingFilterPipe
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
