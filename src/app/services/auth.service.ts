import { Injectable } from '@angular/core';
import { IToken } from '../types/IToken';
import { IProfile } from '../types/IProfile';
import swal from 'sweetalert2';

@Injectable()
export class AuthService {

    /**
     * Save the token to the Local Storage.
     *
     * @param {IToken} token
     */
    public setToken(token: IToken): void {
        localStorage.setItem('token', token.accessToken);
        localStorage.setItem('expiresAt', token.expirationDate);
    }

    /**
     * Get the token from the Local Storage.
     *
     * @return {string}
     */
    public getToken(): string {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiresAt');

        if (!token || !expirationDate) {
            return null;
        }

        if (Date.now() > Date.parse(expirationDate)) {
            swal({
                html: '<i class="fa fa-hourglass-end fa-5x"></i>',
                title: 'Your session has expired.',
                timer: 4000,
                showCloseButton: true,
                showConfirmButton: false
            }).then(
                function () { },
                // Handling the promise rejection.
                function (dismiss) {
                    if (dismiss === 'timer') {
                        console.log('Alert was closed by the timer');
                    }
                }
                );

            this.destroyToken();
            this.destroyProfile();

            return null;
        } else {
            return token;
        }
    }

    /**
     * Remove token from the Local Storage.
     */
    public destroyToken(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresAt');
    }

    /**
     * Save the profile to the Local Storage.
     *
     * @param {IProfile} profile
     */
    public setProfile(profile: IProfile): void {
        localStorage.setItem('profile', JSON.stringify(profile));
    }

    /**
     * Get the profile from the Local Storage.
     *
     * @return {IProfile}
     */
    public getProfile(): IProfile {
        const profile = localStorage.getItem('profile');

        return JSON.parse(profile);
    }

    /**
     * Remove profile from the Local Storage.
     */
    public destroyProfile(): void {
        localStorage.removeItem('profile');
    }

    /**
     * Verify if the user it's authenticated.
     *
     * @return {boolean}
     */
    public userIsAuthenticated(): boolean {
        return !!this.getToken();
    }
}
