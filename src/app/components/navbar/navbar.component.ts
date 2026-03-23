import { Component } from '@angular/core';
import { Category } from '../home/types/category';
import { CategoryService } from '../home/services/category.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
categories:Category[]=[];

constructor(categoryService:CategoryService){
  categoryService.getAllCategories().subscribe(categories=>{
    this.categories=categories.filter(category=>category.parent_category_id===null);
  })  
}
}
