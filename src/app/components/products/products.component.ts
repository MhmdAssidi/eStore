import { Component } from '@angular/core';
import { ProductsService } from './products.service';
import { productListItem } from './products.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers:[ProductsService]

})
export class ProductsComponent {
products:productListItem[]=[];
constructor(private productsService:ProductsService){
  this.products=this.productsService.getProductsList();
}
}
