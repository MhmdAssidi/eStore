import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CategoryService } from './services/category/category.service';
import { CategoriesStoreItem } from './services/category/category.storeItem';
import { ProductsStoreItem } from './services/product/products.storeItem';
import { ProductsService } from './services/product/products.service';
import { UserService } from './services/user/user.service';
import { SearchKeyword } from './types/searchKeyword.type';
import { RouterOutlet } from '@angular/router';
import { cartStoreItem } from './services/cart/cart.storeItem';
@Component({
  selector: 'app-home',
  imports: [HeaderComponent, NavbarComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[CategoryService,CategoriesStoreItem,ProductsStoreItem,ProductsService,cartStoreItem,UserService]
})
export class HomeComponent {
constructor(private categoriesStoreItem:CategoriesStoreItem,private productsStoreItem:ProductsStoreItem){
   this.categoriesStoreItem.loadCategories();
    this.productsStoreItem.loadProducts();
}
onSelectSubCategory(subCategoryId: number): void {
  this.productsStoreItem.loadProducts({subCategoryid: subCategoryId});    

}

onSelectCategory(mainCategoryId: number): void {
  this.productsStoreItem.loadProducts({mainCategory: mainCategoryId});    
}

onSearchKeyword(searchKeyword: SearchKeyword): void {
  this.productsStoreItem.loadProducts({mainCategory: searchKeyword.categoryId,
     keywords: searchKeyword.keywords});
  
    }
}
