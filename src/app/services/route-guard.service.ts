import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable()
export class RouteGuardService implements CanActivate {
  constructor(
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return this.handleCanActivate(route).then((state: boolean) => {
      return state;
    });
  }

  private handleCanActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return Promise.resolve(true);
  }
}
