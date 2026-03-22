import { Injectable } from '@angular/core';
import { productListItem } from './products.type';
import { products } from './products.data';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getProductsList():productListItem[]{
    return products;
  }
}
