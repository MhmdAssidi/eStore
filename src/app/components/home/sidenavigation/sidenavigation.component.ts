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
    this.categories = categoryService.getAllCategories();
  }

  getCategories(parentCategoryId?: number): Category[] {
    return this.categories.filter(category => category.parent_category_id === parentCategoryId);
}
}