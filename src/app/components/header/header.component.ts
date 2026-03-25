import { Component, Output, EventEmitter, output } from '@angular/core';
import { CategoriesStoreItem } from '../home/services/category/category.storeItem';
import { SearchKeyword } from '../home/types/searchKeyword.type';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

   readonly searchClicked = output<SearchKeyword>(); 

  constructor(public categoryStore: CategoriesStoreItem) {}

  onClickSearch(keywords: string, categoryId: string): void {
    this.searchClicked.emit({
      categoryId: Number(categoryId),
      keywords: keywords
    });
  }
}
