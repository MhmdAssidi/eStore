import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidenavigationComponent } from './sidenavigation/sidenavigation.component';
import { ProductsComponent } from "../products/products.component";
import { CategoryService } from './services/category.service';
import { CategoriesStoreItem } from './services/category.storeItem';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, NavbarComponent, SidenavigationComponent, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[CategoryService,CategoriesStoreItem]
})
export class HomeComponent {
constructor(private categoriesStoreItem:CategoriesStoreItem){
this.categoriesStoreItem.loadCategories();
}
}
