import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {Book} from '../book';
import {maxLength} from './validators';
import {ActivatedRoute, Router} from '@angular/router';
import {pluck} from 'rxjs/operators';
import {BookService} from '../book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  bookFormGroup: FormGroup = this.fb.group({
    author: ['', [Validators.required, maxLength(60)]],
    title: ['', [Validators.required, maxLength(100)]],
  });

  private book: Book;

  constructor(private readonly fb: FormBuilder,
              private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly books: BookService) {
    route.data
      .pipe(
        pluck('book')
      )
      .subscribe(book => this.initFormWith(book));
  }

  private initFormWith(book: Book): void {
    if (book) {
      this.book = book;
      this.bookFormGroup.reset(book);
    }
  }

  getErrorMsg(controlName: string): string[] {
    const formControl: AbstractControl = this.bookFormGroup.get(controlName);
    const errorMessages = [];

    if (formControl?.errors) {
      Object.keys(formControl.errors)
        .forEach((errorKey) => {
          let msg = 'Unknown error';
          if (errorKey === 'required') {
            msg = 'Please provide a value';
          }
          if (errorKey === 'maxLength') {
            msg = 'Value too long';
          }
          errorMessages.push(msg);
        });
    }

    return errorMessages;
  }

  saveAndNavigateToOverview(): void {
    if (this.bookFormGroup.valid) {
      const updatedBook: Book = {
        id: this.book?.id,
        author: this.bookFormGroup.get('author').value,
        title: this.bookFormGroup.get('title').value,
      };
      this.books.saveOrUpdate(updatedBook)
        .subscribe(() => this.router.navigate(['/books']));
    }
  }
}
