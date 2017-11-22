import { Injectable } from '@angular/core';
import { HttpWrapper } from '../utilities/http-wrapper.service';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { IPasswords } from '../types/IPasswords';

@Injectable()
export class AccountSettingsService {
    private apiUrl: string = environment.apiUrl;

    /**
     * Inject HttpWrapper dependencie into constructor.
     *
     * @param {HttpWrapper} private _http
     */
    constructor(private _http: HttpWrapper) { }

    /**
     * Change the password of an account.
     *
     * @param  {IPassowrds} passwords
     * @param  {string}     email
     * @return {Observable}
     */
    public changePassword(passwords: IPasswords, email: string): Observable<any> {
        const url = `${this.apiUrl}/users/${email}`;
        const data = {
            currentPassword: passwords.currentPassword,
            password: passwords.newPassword,
            passwordConfirmation: passwords.newPasswordConfirmation
        };

        return this._http.put(url, data);
    }
}
