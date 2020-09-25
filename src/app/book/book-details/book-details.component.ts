import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Book } from '../book';
import { FormModel } from './forms.helper';
import { maxLength } from './validators';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  @Input('book')
  set bookSetter(book: Book) {
    this.bookFormGroup.reset(book);
  }

  @Output()
  bookUpdate = new EventEmitter<Book>();

  bookFormGroupDef: FormModel<Book> = {
    author:  ['', [Validators.required, maxLength(60)]],
    id: {value: undefined, disabled: true},
    title: ['', [Validators.required, maxLength(100)]],
  };

  bookFormGroup: FormGroup = this.fb.group(this.bookFormGroupDef);

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
    this.bookUpdate.emit(this.bookFormGroup.getRawValue());
  }
}
