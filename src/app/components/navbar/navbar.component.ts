import { Component, output, signal } from '@angular/core';
import { CategoriesStoreItem } from '../home/services/category/category.storeItem';
import { Category } from '../home/types/category';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  readonly categoryClicked=output<number>();
  displayOptions=signal(true);
constructor(public categoryStore:CategoriesStoreItem,private router:Router){
  router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
    this.displayOptions.set(router.url === '/home/products');
  });
}

onCategoryClicked(mainCategory: Category): void {
  this.categoryClicked.emit(mainCategory.id);  
  }
}
