import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { isLoggedIn } from './utils/auth';
import * as myGlobals from './globals';

@Injectable()
export class StartedRentalGuardService implements CanActivate {
    constructor(private _router: Router) {}


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (isLoggedIn()){
            if((myGlobals.stateModify != "In attesa di approvazione.") && (myGlobals.stateModify != "Approvato.")){
                this._router.navigate(['/history']);
                return false;
            }
            else
                return true;
        }
        else{
            this._router.navigate(['/login']);
            return false;
        }
    }
}