import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidenavigationComponent } from './sidenavigation/sidenavigation.component';
import { ProductsComponent } from "../products/products.component";
import { CategoryService } from './services/category/category.service';
import { CategoriesStoreItem } from './services/category/category.storeItem';
import { ProductsStoreItem } from './services/product/products.storeItem';
import { ProductsService } from './services/product/products.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, NavbarComponent, SidenavigationComponent, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[CategoryService,CategoriesStoreItem,ProductsStoreItem,ProductsService]
})
export class HomeComponent {
constructor(private categoriesStoreItem:CategoriesStoreItem,private productsStoreItem:ProductsStoreItem){
   this.categoriesStoreItem.loadCategories();
    this.productsStoreItem.loadProducts();
}
onSelectSubCategory(subCategoryId: number): void {
  this.productsStoreItem.loadProducts({subCategoryid: subCategoryId});    

}
}
