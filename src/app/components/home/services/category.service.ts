import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../types/category';
import { categories } from '../sampleData/categories.data';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    // return this.http.get<Category[]>('http://localhost:5001/productCategories');
    return of(categories);
  }
}