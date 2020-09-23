import {Component} from '@angular/core';
import {Book} from '../book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  book: Book;

  constructor() {
    this.book = {
      author: 'John Example',
      title: 'Some title'
    };
  }
}
