import {Component} from '@angular/core';
import {Book} from '../book';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books: Book[];
  selectedBook: Book | null = null;

  constructor() {
    this.books = [
      {
        id: 0,
        author: 'Douglas Crockford',
        title: 'JavaScript. The Good Parts'
      },
      {
        id: 1,
        author: 'John Example',
        title: 'Angular for newbies'
      },
      {
        id: 2,
        author: 'Marek Matczak',
        title: 'Angular for nerds'
      }
    ];
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return book === this.selectedBook;
  }

  updateBook(bookToUpdate: Book): void {
    this.books = this.books.map(
      book => book.id === bookToUpdate.id ? bookToUpdate : book);
    this.selectBook(bookToUpdate);
  }
}
