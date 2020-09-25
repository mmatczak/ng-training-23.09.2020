import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Book} from '../book';
import {Observable, throwError} from 'rxjs';
import {BookService} from '../book.service';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class BookResolver implements Resolve<Book> {
  constructor(private readonly books: BookService,
              private readonly router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    if (route.paramMap.has('bookId')) {
      const bookIdAsString = route.paramMap.get('bookId');
      const bookId = +bookIdAsString;
      if (!isNaN(bookId)) {
        return this.books.getOne(bookId)
          .pipe(
            catchError(error => {
              this.router.navigate(['/book']);
              return throwError(error);
            }));
      }
    }
    this.router.navigate(['/book']);
  }
}
