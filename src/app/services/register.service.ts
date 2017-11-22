import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IAccount } from '../types/IAccount';
import { environment } from '../../environments/environment';

@Injectable()
export class RegisterService {
    private apiUrl: string = environment.apiUrl;

    /**
     * Class constructor.
     *
     * @param {Http} private http
     */
    constructor(private _http: Http) { }

    /**
     * Create a new account.
     *
     * @param {IAccount} account
     * @return {Observable}
     */
    public create(account: IAccount): Observable<any> {
        const url = `${this.apiUrl}/register`;

        return this._http.post(url, account);
    }
}
