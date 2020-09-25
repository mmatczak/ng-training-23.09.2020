import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
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

  book: Book;

  @Output()
  bookUpdate = new EventEmitter<Book>();

  bookFormGroup: FormGroup = this.fb.group({
    author: ['', [Validators.required, maxLength(60)]],
    title: ['', [Validators.required, maxLength(100)]],
  });

  constructor(private readonly fb: FormBuilder) {}


  getErrorMsg(controlName: string): string[]{
    const formControl: AbstractControl = this.bookFormGroup.get(controlName);
    const errorMessages = [];

    if (formControl?.errors){
      Object.keys(formControl.errors)
      .forEach((errorKey) => {
          let msg = 'Unknown error';
          if (errorKey === 'required'){
            msg = 'Please provide a value';
          }
          if (errorKey === 'maxLength'){
            msg = 'Value too long';
          }
          errorMessages.push(msg);
      });
    }

    return errorMessages;
  }
  notifyOnBookUpdate(): void {
    const updatedBook: Book = {
      id: this.book.id,
      author: this.bookFormGroup.get('author').value,
      title: this.bookFormGroup.get('title').value,
    };
    this.bookUpdate.emit(updatedBook);
  }
}
