import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements DoCheck {
    private userEmail: string;

    /**
     * Class constructor.
     *
     * @param {Router}      private _router
     * @param {AuthService} private _auth
     */
    constructor(
        private _router: Router,
        private _auth: AuthService) { }

    ngDoCheck(): void {
        if (this.userIsAuth() && this.userEmail == null) {
            this.userEmail = this._auth.getProfile().email;
        }
    }

    /**
      * Verify if the user it's authenticated.
      *
      * @return {boolean}
      */
    private userIsAuth(): boolean {
        return this._auth.userIsAuthenticated();
    }

    /**
     * Destroy the session of the authenticated user.
     */
    private logOut(): void {
        this._auth.destroyToken();
        this._auth.destroyProfile();
    }
}
