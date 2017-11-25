import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean {
    if (this.authService.user$.getValue()) {
      return true;
    }
    return false;
  }
}
