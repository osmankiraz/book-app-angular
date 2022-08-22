import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  saveBookImage(img: any) {
    return this.http.post<any>(`${this.apiurl}/saveImage`, img);
  }



}
