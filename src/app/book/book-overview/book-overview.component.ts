import {Component} from '@angular/core';
import {Book} from '../book';
import {BookService} from '../book.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books$: Observable<Book[]>;
  selectedBook: Book | null = null;

  constructor(private readonly books: BookService) {
    this.books$ = books.getAll();
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return book === this.selectedBook;
  }

  updateBook(bookToUpdate: Book): void {
    this.books.update(bookToUpdate)
      .subscribe(book => this.selectBook(book));
  }
}
