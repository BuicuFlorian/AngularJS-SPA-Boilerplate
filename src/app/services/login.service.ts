import { Injectable } from '@angular/core';
import { HttpWrapper } from '../utilities/http-wrapper.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { IUser } from '../types/IUser';

@Injectable()
export class LoginService {
    private apiUrl: string = environment.apiUrl;

    /**
     * Class constructor.
     *
     * @param {Http}     private _http
     * @param {HttpWrapper} private _httpWrap
     */
    constructor(
        private _http: Http,
        private _httpWrap: HttpWrapper) { }

    /**
     * Authenticate the user.
     *
     * @param {IUser} user
     */
    public authenticate(user: IUser): Observable<any> {
        const url = `${this.apiUrl}/authenticate`;

        return this._http.post(url, user);
    }
}
