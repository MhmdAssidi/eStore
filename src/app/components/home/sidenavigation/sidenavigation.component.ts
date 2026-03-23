import { Component, inject } from '@angular/core';
import { Category } from '../types/category';
import { CategoryService } from '../services/category.service';
import { CategoriesStoreItem } from '../services/category.storeItem';

@Component({
  selector: 'app-sidenavigation',
  imports: [],
  templateUrl: './sidenavigation.component.html',
  styleUrl: './sidenavigation.component.css'
})
export class SidenavigationComponent {

  private categoryStore=inject(CategoriesStoreItem);
readonly categories=this.categoryStore.categories;
  getCategories(parentCategoryId?: number): Category[] {
    return this.categories().filter(category => category.parent_category_id === parentCategoryId);
}
}