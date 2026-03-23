import { Component } from '@angular/core';
import { CategoriesStoreItem } from '../home/services/category.storeItem';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
constructor(public categoryStore:CategoriesStoreItem){
  
}
}
