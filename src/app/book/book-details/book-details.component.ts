import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  @Input()
  book: Book;

  @Output()
  bookUpdate = new EventEmitter<Book>();

  notifyOnBookUpdate(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const authorElement = form.querySelector<HTMLInputElement>('#author');
    const titleElement = form.querySelector<HTMLInputElement>('#title');

    const updatedBook: Book = {
      id: this.book.id,
      author: authorElement.value,
      title: titleElement.value
    };

    this.bookUpdate.emit(updatedBook);
  }
}
