import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { TutorialsComponent } from './components/tutorials/tutorials.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  }, {
    path: "articles",
    component: ArticlesComponent,
    data: { title: "Articles" }
  }, {
    path: "bookshelf",
    component: BookshelfComponent,
    data: { title: "Bookshelf" }
  }, {
    path: "tutorials",
    component: TutorialsComponent,
    data: { title: "Tutorials" }
  }, {
    path: "**",
    component: PageNotFoundComponent,
    data: { title: "Page not found" }
  }
];


@NgModule(
  {
    imports: [
      RouterModule.forRoot(routes,  {
        enableTracing: false,
        useHash: false,
        initialNavigation: false,
        onSameUrlNavigation: "ignore",
        scrollPositionRestoration: "enabled",
        anchorScrolling: "disabled"
      })
    ],
    exports: [RouterModule]
  }
)
export class AppRoutingModule { }
