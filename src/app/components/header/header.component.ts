import { Component } from '@angular/core';
import { CategoriesStoreItem } from '../home/services/category/category.storeItem';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public categoryStore:CategoriesStoreItem){
  }
}
