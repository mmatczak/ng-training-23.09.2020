import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Book } from '../book';
import { maxLength } from './validators';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  @Input('book')
  set bookSetter(book: Book) {
    this.book = book;
    this.bookFormGroup.reset(book);
  }

  get authorControl(){
    return this.bookFormGroup.get('author');
  }  
  get titleControl(){
    return this.bookFormGroup.get('title');
  }
  book: Book;

  @Output()
  bookUpdate = new EventEmitter<Book>();

  bookFormGroup: FormGroup = this.fb.group({
    author: ['', [Validators.required, maxLength(60)]],
    title: ['', [Validators.required, maxLength(100)]],
  });

  constructor(private readonly fb: FormBuilder) {}

  notifyOnBookUpdate(): void {
    const updatedBook: Book = {
      id: this.book.id,
      author: this.bookFormGroup.get('author').value,
      title: this.bookFormGroup.get('title').value,
    };
    this.bookUpdate.emit(updatedBook);
  }
}
