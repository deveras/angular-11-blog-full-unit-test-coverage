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
    component: ArticlesComponent
  }, {
    path: "bookshelf",
    component: BookshelfComponent
  }, {
    path: "tutorials",
    component: TutorialsComponent
  }, {
    path: "**",
    component: PageNotFoundComponent
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
