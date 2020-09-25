import {Component} from '@angular/core';
import {Book} from '../book';
import {BookService} from '../book.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {BusyIndicatorService} from '../../shared/busy-indicator/busy-indicator.service';
import {delay, tap} from 'rxjs/operators';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books$: Observable<Book[]>;

  constructor(private readonly books: BookService,
              private readonly router: Router,
              private readonly busy: BusyIndicatorService) {
    this.books$ = books.getAll()
      .pipe(
        tap(() => this.busy.on()),
        delay(2000),
        tap(() => this.busy.off()),
      );
  }

  navigateToBookDetails(book: Book): void {
    this.router.navigate(['/book', book.id]);
  }
}
