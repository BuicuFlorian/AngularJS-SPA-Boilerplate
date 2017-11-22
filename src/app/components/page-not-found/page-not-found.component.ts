import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    moduleId: module.id,
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {

    /**
     * Inject Location dependencie into constructor.
     *
     * @param {Location} private _location
     */
    constructor(private _location: Location) { }

    /**
     * Redirect to the previous location.
     */
    private goBack(): void {
        this._location.back();
    }
}
