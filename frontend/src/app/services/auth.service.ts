import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (sessionStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
