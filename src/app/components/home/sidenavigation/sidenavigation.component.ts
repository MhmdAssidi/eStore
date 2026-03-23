import { Component, inject } from '@angular/core';
import { Category } from '../types/category';
import { CategoriesStoreItem } from '../services/category.storeItem';

@Component({
  selector: 'app-sidenavigation',
  imports: [],
  templateUrl: './sidenavigation.component.html',
  styleUrl: './sidenavigation.component.css'
})
export class SidenavigationComponent {
  private categoryStore = inject(CategoriesStoreItem);
  readonly categories = this.categoryStore.categories;

  getCategories(parentCategoryId?: number): Category[] {
    if (parentCategoryId === undefined) {
      return this.categories().filter(category => category.parent_category_id == null);
    } else {
      return this.categories().filter(category => category.parent_category_id === parentCategoryId);
    }
  }
}