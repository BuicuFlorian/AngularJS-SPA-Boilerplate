import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    /**
     * Class constructor.
     *
     * @param {AuthService} private _auth
     */
    constructor(private _auth: AuthService) {}

    private userEmail = this._auth.getProfile().email;
}
