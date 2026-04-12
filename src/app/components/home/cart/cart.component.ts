import { Component } from '@angular/core';
import { CartItem } from '../types/cart.type';
import { Router } from '@angular/router';
import { cartStoreItem } from '../services/cart/cart.storeItem';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user/services/user.service';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  orderForm: any;

constructor(
  public cartStore: cartStoreItem,
  private router: Router,
  private userService: UserService,
  private fb: FormBuilder
) {
  this.orderForm = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    pin: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });

  this.userService.loggedInUsers$.subscribe(userData => {
    this.orderForm.patchValue({
      name: `${userData?.firstname || ''} ${userData?.lastname || ''}`.trim(),
      address: userData?.address || '',
      city: userData?.city || '',
      state: userData?.state || '',
      pin: userData?.pin || ''
    });
  });
}

  goToProducts(): void {
    this.router.navigate(['/home/products']);
  }

  getTax(): number {
    return this.cartStore.totalAmount() * 0.1;
  }

  getTotal(): number {
    return this.cartStore.totalAmount() + this.getTax();
  }

  getShippingCost(): number {
    return 0;
  }

  updateQuantity($event: any, cartItem: CartItem): void {
    const buttonText = $event.target.innerText.trim();

    if (buttonText === '+') {
      this.cartStore.addProduct(cartItem.product);
    } else if (buttonText === '−' || buttonText === '-') {
      this.cartStore.decreaseProductQuantity(cartItem);
    }
  }

  removeItem(cartItem: CartItem): void {
    this.cartStore.removeProduct(cartItem);
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      console.log('Order submitted:', this.orderForm.value);
    } else {
      console.log('Order form is invalid. Please fill in all required fields correctly.');
    }
  }
}