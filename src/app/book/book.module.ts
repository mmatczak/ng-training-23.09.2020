import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from './book-details/book-details.component';
import {BookOverviewComponent} from './book-overview/book-overview.component';
import {BookService} from './book.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BookDetailsComponent, BookOverviewComponent],
  exports: [
    BookOverviewComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class BookModule {
  static forRoot(): ModuleWithProviders<BookModule> {
    return {
      ngModule: BookModule,
      providers: [BookService]
    };
  }
}
