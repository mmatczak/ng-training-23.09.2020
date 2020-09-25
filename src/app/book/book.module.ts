import {ModuleWithProviders, NgModule} from '@angular/core';
import {BookDetailsComponent} from './book-details/book-details.component';
import {BookOverviewComponent} from './book-overview/book-overview.component';
import {BookService} from './book.service';
import {SharedModule} from '../shared/shared.module';
import {BookResolver} from './book-details/book.resolver';

@NgModule({
  declarations: [BookDetailsComponent, BookOverviewComponent],
  exports: [
    BookOverviewComponent
  ],
  imports: [
    SharedModule
  ]
})
export class BookModule {
  static forRoot(): ModuleWithProviders<BookModule> {
    return {
      ngModule: BookModule,
      providers: [BookService, BookResolver]
    };
  }
}
