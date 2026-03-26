import { Component, Output, EventEmitter, output, signal } from '@angular/core';
import { CategoriesStoreItem } from '../home/services/category/category.storeItem';
import { SearchKeyword } from '../home/types/searchKeyword.type';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { cartStoreItem } from '../home/services/cart/cart.storeItem';
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

   readonly searchClicked = output<SearchKeyword>(); 
  displaySearch=signal(true);
  constructor(public categoryStore: CategoriesStoreItem,private router:Router,public cart:cartStoreItem) {
    router.events. //listens to any navigation (page change) in Angular.
    pipe(filter(event => event instanceof NavigationEnd //We only care when the navigation is completed, not during loading. and we care for the veent of naviagtion end only thats why we filter
    )).subscribe(() => {
      this.displaySearch.set(router.url === '/home/products');
    });
  }

  onClickSearch(keywords: string, categoryId: string): void {
    this.searchClicked.emit({
      categoryId: Number(categoryId),
      keywords: keywords
    });
  }
}
