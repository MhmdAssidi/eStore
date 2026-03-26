import { Component } from '@angular/core';
import { ProductsService } from '../home/services/product/products.service';
import { Product } from '../home/types/products.type';
import { CommonModule } from '@angular/common';
import { ProductsStoreItem } from '../home/services/product/products.storeItem';
import { RouterLink } from "@angular/router";
import { cartStoreItem } from '../home/services/cart/cart.storeItem';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers:[ProductsService]

})
export class ProductsComponent {

constructor(public productStoreItem:ProductsStoreItem,private cart:cartStoreItem) {

}

addToCart(product:Product){
  this.cart.addProduct(product);  

}
}
