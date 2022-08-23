import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  apiurl: string = `${environment.baseUrl}/book`;
  constructor(private http: HttpClient) {}

  addBook(book: Book): Observable<any> {
    return this.http.post<any>(this.apiurl, book);
  }

  updateBook(bookId: string, book: Book) {
    return this.http.put<any>(`${this.apiurl}/${bookId}`, book);
  }

  saveBookImage(img: any) {
    return this.http.post<any>(`${this.apiurl}/saveImage`, img);
  }

  getBooks() {
    return this.http.get<any>(this.apiurl).pipe(map((res) => res.data));
  }

  getBookById(bookId: string) {
    return this.http
      .get<any>(`${this.apiurl}/${bookId}`)
      .pipe(map((response) => response.data));
  }
}
