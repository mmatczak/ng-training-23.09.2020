import {Component} from '@angular/core';
import {Book} from '../book';
import {BookService} from '../book.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books$: Observable<Book[]>;

  constructor(private readonly books: BookService,
              private readonly router: Router) {
    this.books$ = books.getAll();
  }

  navigateToBookDetails(book: Book): void {
    this.router.navigate(['/book', book.id]);
  }
}
