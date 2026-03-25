import { Component, output } from '@angular/core';
import { CategoriesStoreItem } from '../home/services/category/category.storeItem';
import { Category } from '../home/types/category';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  readonly categoryClicked=output<number>();
constructor(public categoryStore:CategoriesStoreItem){
  
}

onCategoryClicked(mainCategory: Category): void {
  this.categoryClicked.emit(mainCategory.id);  
  }
}
