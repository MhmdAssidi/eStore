import { Component } from '@angular/core';
import { ProductsService } from '../home/services/product/products.service';
import { Product } from '../home/types/products.type';
import { CommonModule } from '@angular/common';
import { ProductsStoreItem } from '../home/services/product/products.storeItem';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers:[ProductsService]

})
export class ProductsComponent {

constructor(public productStoreItem:ProductsStoreItem){

}
}
