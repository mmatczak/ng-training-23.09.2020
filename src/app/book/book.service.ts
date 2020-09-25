import {Book} from './book';
import {BehaviorSubject, Observable} from 'rxjs';

export class BookService {
  private idSeq = 0;

  private booksSubject = new BehaviorSubject<Book[]>([
    {
      id: this.idSeq++,
      author: 'Douglas Crockford',
      title: 'JavaScript. The Good Parts'
    },
    {
      id: this.idSeq++,
      author: 'John Example',
      title: 'Angular for newbies'
    },
    {
      id: this.idSeq++,
      author: 'Marek Matczak',
      title: 'Angular for nerds'
    }
  ]);

  private readonly books$ = this.booksSubject.asObservable();

  getAll(): Observable<Book[]> {
    return this.books$;
  }

  getOne(id: number): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const currentBooks = this.booksSubject.getValue();
      const foundBook = currentBooks.find(book => book.id === id);
      if (foundBook) {
        subscriber.next(foundBook);
        subscriber.complete();
      } else {
        subscriber.error(`Book with id ${id} could not be found`);
      }
    });
  }

  saveOrUpdate(bookToSaveOrUpdate: Book): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const currentBooks = this.booksSubject.getValue();
      let returnedBook;
      let newBooks;
      if (bookToSaveOrUpdate.id != null) {
        returnedBook = {...bookToSaveOrUpdate};
        newBooks = currentBooks.map(book => book.id === returnedBook.id ? returnedBook : book);
      } else {
        returnedBook = {id: this.idSeq++, ...bookToSaveOrUpdate};
        newBooks = [...currentBooks, returnedBook];
      }
      this.booksSubject.next(newBooks);
      subscriber.next(returnedBook);
      subscriber.complete();
    });
  }
}
