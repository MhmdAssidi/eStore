import { Component } from '@angular/core';
import { CartItem } from '../types/cart.type';
import { Router } from '@angular/router';
import { cartStoreItem } from '../services/cart/cart.storeItem';
import { NgClass } from "../../../../../node_modules/@angular/common/common_module.d-NEF7UaHr";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
constructor(public cartStore:cartStoreItem,private router:Router) {
  
}

goToProducts(): void {
  this.router.navigate(['/home/products']);
}

getTax(): number {
  return this.cartStore.totalAmount() * 0.1; // 10% tax
}

getTotal(): number {
  return this.cartStore.totalAmount() + this.getTax();
}

getShippingCost(): number {
  return 0; // Free shipping
}

updateQuantity($event: any, cartItem: CartItem): void {
  const buttonText = $event.target.innerText.trim();
  if(buttonText==='+'){
    this.cartStore.addProduct(cartItem.product);
  } else if(buttonText==='−' || buttonText==='-'){
    this.cartStore.decreaseProductQuantity(cartItem); 
  }
}

removeItem(cartItem: CartItem): void {
  this.cartStore.removeProduct(cartItem);
}
}
