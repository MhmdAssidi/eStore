import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../user/services/user.service';
import { inject } from '@angular/core';
import { map, pipe } from 'rxjs';
export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router=inject(Router);

 if (!userService.isUserAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};


