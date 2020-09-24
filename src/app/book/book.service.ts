import {Book} from './book';
import {BehaviorSubject, Observable} from 'rxjs';

export class BookService {
  private booksSubject = new BehaviorSubject<Book[]>([
    {
      id: 0,
      author: 'Douglas Crockford',
      title: 'JavaScript. The Good Parts'
    },
    {
      id: 1,
      author: 'John Example',
      title: 'Angular for newbies'
    },
    {
      id: 2,
      author: 'Marek Matczak',
      title: 'Angular for nerds'
    }
  ]);

  private readonly books$ = this.booksSubject.asObservable();

  getAll(): Observable<Book[]> {
    return this.books$;
  }

  update(bookToUpdate: Book): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const bookToUpdateCopy = {...bookToUpdate};
      const currentBooks = this.booksSubject.getValue();
      const newBooks = currentBooks.map(book => book.id === bookToUpdateCopy.id ? bookToUpdateCopy : book);
      this.booksSubject.next(newBooks);

      subscriber.next(bookToUpdateCopy);
      subscriber.complete();
    });
  }
}
