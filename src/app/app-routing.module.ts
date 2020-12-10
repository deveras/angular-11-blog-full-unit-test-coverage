import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { TutorialsComponent } from './components/tutorials/tutorials.component';
import { ContentComponent } from './components/content/content.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }, {
    path: 'home',
    component: HomeComponent,
  }, {
    path: 'articles',
    component: ArticlesComponent,
    data: {
      title: 'Articles',
      breadcrumbs: {
        title: 'Articles'
      }
    }
  }, {
    path: 'articles/:id',
    component: ArticlesComponent,
    data: {
      title: 'Articles',
      breadcrumbs: {
        title: 'Articles'
      }
    }
  }, {
    path: 'articles/:id/:slug',
    component: ContentComponent,
    data: {
      title: 'Articles',
      breadcrumbs: {
        title: 'Articles',
        route: 'articles'
      }
    }
  }, {
    path: 'bookshelf',
    component: BookshelfComponent,
    data: {
      title: 'Bookshelf',
      breadcrumbs: {
        title: 'Bookshelf'
      }
    }
  }, {
    path: 'bookshelf/:id',
    component: BookshelfComponent,
    data: {
      title: 'Bookshelf',
      breadcrumbs: {
        title: 'Bookshelf'
      }
    }
  }, {
    path: 'bookshelf/:id/:slug',
    component: ContentComponent,
    data: {
      title: 'Bookshelf',
      breadcrumbs: {
        title: 'Bookshelf',
        route: 'bookshelf'
      }
    }
  }, {
    path: 'tutorials',
    component: TutorialsComponent,
    data: {
      title: 'Tutorials',
      breadcrumbs: {
        title: 'Tutorials'
      }
    }
  }, {
    path: 'tutorials/:id',
    component: TutorialsComponent,
    data: {
      title: 'Tutorials',
      breadcrumbs: {
        title: 'Tutorials'
      }
    }
  }, {
    path: 'tutorials/:id/:slug',
    component: ContentComponent,
    data: {
      title: 'Tutorials',
      breadcrumbs: {
        title: 'Tutorials',
        route: 'tutorials'
      }
    }
  }, {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      title: 'Page not found',
      breadcrumb: 'Page not found'
    }
  }
];


@NgModule(
  {
    imports: [
      RouterModule.forRoot(routes,  {
        enableTracing: false,
        useHash: false,
        initialNavigation: 'enabled',
        onSameUrlNavigation: 'reload',
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'disabled',
        relativeLinkResolution: 'legacy'
      })
    ],
    exports: [RouterModule]
  }
)
export class AppRoutingModule { }
