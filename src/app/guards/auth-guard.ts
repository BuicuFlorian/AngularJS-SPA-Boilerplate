import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

	/**
	 * Class constructor.
	 *
	 * @param {Router}      private _router
	 * @param {AuthService} private _auth
	 */
    constructor(
        private _router: Router,
        private _auth: AuthService) { }

    /**
     * Verify if the user it's authenticated.
     *
     * @return {boolean}
     */
    public canActivate(): boolean {
        if (this._auth.userIsAuthenticated()) {
            return true;
        } else {
            this._router.navigate(['/login']);
            return false;
        }
    }
}
