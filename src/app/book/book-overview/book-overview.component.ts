import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Book} from '../book';
import {BookService} from '../book.service';
import {fromEvent, Observable, Subject} from 'rxjs';
import {debounceTime, distinct, distinctUntilChanged, map, takeUntil} from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnInit, OnDestroy {
  books$: Observable<Book[]>;
  selectedBook: Book | null = null;

  searchInput: FormControl = new FormControl();

  private readonly unsubscribe = new Subject();

  constructor(private readonly books: BookService) {
    this.books$ = books.getAll();
  }
  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe)
      )
      .subscribe(searchText => {
        console.log(searchText);
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return book === this.selectedBook;
  }

  updateBook(bookToUpdate: Book): void {
    this.books.update(bookToUpdate)
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(book => this.selectBook(book));
  }
}
