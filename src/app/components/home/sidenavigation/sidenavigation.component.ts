import { Component } from '@angular/core';
import { Category } from '../types/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-sidenavigation',
  imports: [],
  templateUrl: './sidenavigation.component.html',
  styleUrl: './sidenavigation.component.css'
})
export class SidenavigationComponent {
  categories: Category[] = [];

  constructor(categoryService: CategoryService) {
    categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

 getCategories(parentCategoryId?: number): Category[] {

  // Case 1: No id so we need main categories
  if (parentCategoryId === undefined) {
    return this.categories.filter(category => {
      return category.parent_category_id === null;
    });
  }

  // Case 2: With id so we need subcategories
  else {
    return this.categories.filter(category => {
      return category.parent_category_id === parentCategoryId;
    });
  }

}
}