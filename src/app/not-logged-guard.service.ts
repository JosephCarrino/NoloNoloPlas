import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { isLoggedIn } from './utils/auth';

@Injectable()
export class NotLoggedGuardService implements CanActivate {
    constructor(private _router: Router) {}


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (isLoggedIn())
            return true;
        else{
            this._router.navigate(['/login']);
            return false;
        }
    }
}