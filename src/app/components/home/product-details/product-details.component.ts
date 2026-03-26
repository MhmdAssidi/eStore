import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/product/products.service';
import { Product } from '../types/products.type';
import{takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';
import { cartStoreItem } from '../services/cart/cart.storeItem';
@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
private readonly route = inject(ActivatedRoute);
private readonly productsService = inject(ProductsService);
protected product = signal<Product | null>(null);
private readonly cart=inject(cartStoreItem);
constructor() {
  const idParam=this.route.snapshot.paramMap.get('id');
  let id=null;
  if(Number(idParam)){
    id=Number(idParam);
}
if (id != null && !isNaN(id)) {
  this.productsService.getProduct(id)
    .pipe(takeUntilDestroyed())
    .subscribe((res) => {
      this.product.set(Array.isArray(res) ? res[0] : res);
    });
    return;
  }
}

addToCart(){
  const currentProduct=this.product();
  if(currentProduct){
    this.cart.addProduct(currentProduct);
  }
}
}