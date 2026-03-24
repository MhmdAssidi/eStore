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

  getAllProducts(filter?:{mainCategory?:number;subCategoryid?:number;}):
       Observable<Product[]>{
        let params=new HttpParams();
        if(filter?.mainCategory!=null){
        params=params.set('mainCategory',filter.mainCategory.toString());
        }
        if(filter?.subCategoryid!=null){
          params=params.set('subCategoryid',filter.subCategoryid.toString());
        }
    return this.http.get<Product[]>(this.API_URL,{params});
  }
}
