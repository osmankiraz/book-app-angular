import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiurl: string = `${environment.baseUrl}/category`;
  constructor(private http: HttpClient) {}

  addCategory(category: Category) {
    return this.http.post<any>(this.apiurl, category);
  }

  getCategories() {
    return this.http
      .get<any>(this.apiurl)
      .pipe(map((response) => response.data));
  }

  getCategoryById(categoryId: string) {
    return this.http
      .get<any>(`${this.apiurl}/${categoryId}`)
      .pipe(map((response) => response.data));
  }

  updateCategory(categoryId: string, category: Category) {
    return this.http.put<any>(`${this.apiurl}/${categoryId}`, category);
  }

  deleteCategory(categoryId:string){
    return this.http.delete<any>(`${this.apiurl}/${categoryId}`)
  }
}
