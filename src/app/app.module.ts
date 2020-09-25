import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BookModule} from './book/book.module';
import {RouterModule} from '@angular/router';
import {BookDetailsComponent} from './book/book-details/book-details.component';
import {BookOverviewComponent} from './book/book-overview/book-overview.component';
import {SharedModule} from './shared/shared.module';
import {BookResolver} from './book/book-details/book.resolver';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/books', pathMatch: 'full'},
      {
        path: 'books',
        component: BookOverviewComponent
      },
      {
        path: 'book',
        component: BookDetailsComponent
      },
      {
        path: 'book/:bookId',
        component: BookDetailsComponent,
        resolve: {
          book: BookResolver
        }
      }
    ]),
    BookModule.forRoot(),
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
