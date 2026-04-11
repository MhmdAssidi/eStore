import { Component, effect, output, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

import { CategoriesStoreItem } from '../home/services/category/category.storeItem';
import { SearchKeyword } from '../home/types/searchKeyword.type';
import { cartStoreItem } from '../home/services/cart/cart.storeItem';
import { UserService } from '../home/user/services/user.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  readonly searchClicked = output<SearchKeyword>();

  displaySearch = signal(true);
  isUserAuthenticated = signal(false);
  userName = signal('');

  constructor(
    public categoryStore: CategoriesStoreItem,
    private router: Router,
    public cart: cartStoreItem,
    private userService: UserService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.displaySearch.set(this.router.url === '/home/products');
      });

    const authSignal = toSignal(this.userService.isUserAuthenticated$, {
      initialValue: false
    });

    const loggedInUserSignal = toSignal(this.userService.loggedInUsers$, {
      initialValue: {
        firstname: '',
        lastname: '',
        address: '',
        city: '',
        state: '',
        pin: '',
        email: ''
      }
    });

    effect(() => {
      this.isUserAuthenticated.set(authSignal());
      this.userName.set(loggedInUserSignal().firstname);
    });
  }

  onClickSearch(keywords: string, categoryId: string): void {
    this.searchClicked.emit({
      categoryId: Number(categoryId),
      keywords: keywords
    });
  
  
  }
  logout(event?: MouseEvent): void {
    event?.preventDefault();
    event?.stopPropagation();
    this.userService.logout();
  }
}