import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Book} from '../book';
import {BookService} from '../book.service';
import {fromEvent, Observable, Subject} from 'rxjs';
import {debounceTime, distinct, distinctUntilChanged, map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements AfterViewInit, OnDestroy {
  books$: Observable<Book[]>;
  selectedBook: Book | null = null;

  @ViewChild('search')
  searchInput: ElementRef<HTMLInputElement>;

  private readonly unsubscribe = new Subject();

  constructor(private readonly books: BookService) {
    this.books$ = books.getAll();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        map(event => (event.target as HTMLInputElement).value),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe)
      )
      .subscribe(searchText => {
        console.log(searchText);
      });
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
