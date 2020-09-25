import {Book} from './book';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {delay} from 'rxjs/operators';

@Injectable()
export class BookService {
  constructor(private readonly http: HttpClient) {
  }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>('api/books');
  }

  getOne(id: number): Observable<Book> {
    return this.http.get<Book>(`api/books/${id}`)
      .pipe(delay(3000));
  }

  saveOrUpdate(bookToSaveOrUpdate: Book): Observable<Book> {
    if (bookToSaveOrUpdate.id != null) {
      return this.http.put<Book>(`api/books/${bookToSaveOrUpdate.id}`, bookToSaveOrUpdate);
    } else {
      return this.http.post<Book>(`api/books`, bookToSaveOrUpdate);
    }
  }
}
