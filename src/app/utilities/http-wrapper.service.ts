import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpWrapper {

    /**
     * Class constructor.
     *
     * @param {Http}        private
     * @param {AuthService} private
     */
    constructor(
        private _http: Http,
        private _auth: AuthService) { }

    /**
     * Add authorization token to the header.
     *
     * @param {Headers} headers
     */
    private createAuthorizationHeader(headers: Headers) {
        headers.append('authorization', this._auth.getToken());
    }

    /**
     * Return Http get method with authorization header added.
     *
     * @param {string} url
     */
    public get(url: string) {
        const headers = new Headers();
        this.createAuthorizationHeader(headers);

        return this._http.get(url, { headers: headers });
    }

    /**
     * Return Http post method with authorization header added.
     *
     * @param {string} url
     * @param {Object} data
     */
    public post(url: string, data: Object) {
        const headers = new Headers();
        this.createAuthorizationHeader(headers);

        return this._http.post(url, data, { headers: headers });
    }

    /**
     * Return Http put method with authorization header added.
     *
     * @param {string} url
     * @param {Object} data
     */
    public put(url: string, data: Object) {
        const headers = new Headers();
        this.createAuthorizationHeader(headers);

        return this._http.put(url, data, { headers: headers });
    }

    /**
     * Return Http delete method with authorization header added.
     *
     * @param {string} url
     */
    public delete(url: string) {
        const headers = new Headers();
        this.createAuthorizationHeader(headers);

        return this._http.delete(url, { headers: headers });
    }
}
