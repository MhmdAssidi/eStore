import { Injectable } from '@angular/core';
import { Product } from '../../types/products.type';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly API_URL = 'http://localhost:5001/products';
  constructor(private http: HttpClient) { 

  }

  getAllProducts(filter?: { mainCategory?: number; subCategoryid?: number; keywords?: string }): Observable<Product[]> {
    let params = new HttpParams();

    if (filter?.mainCategory != null) {
      params = params.set('maincategoryid', filter.mainCategory.toString());
    }

    if (filter?.subCategoryid != null) {
      params = params.set('subcategoryid', filter.subCategoryid.toString());
    }

    if (filter?.keywords && filter.keywords.trim() !== '') {
      params = params.set('keywords', filter.keywords.trim());
    }

    return this.http.get<Product[]>(this.API_URL, { params });
  }
}
