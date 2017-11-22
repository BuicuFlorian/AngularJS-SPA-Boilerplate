import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../types/IUser';
import swal from 'sweetalert2';


@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService]
})
export class LoginComponent implements OnInit {
    private loginForm: FormGroup;
    private errors: Array<any> = [];
    private loading = false;

    /**
     * Class constructor.
     *
     * @param {Router}       private _router
     * @param {AuthService}  private _auth
     * @param {FormBuilder}  private _formBuilder
     * @param {LoginService} private _loginService
     */
    constructor(
        private _router: Router,
        private _auth: AuthService,
        private _formBuilder: FormBuilder,
        private _loginService: LoginService) { }

    ngOnInit(): void {
        // Validate login form.
        this.loginForm = this._formBuilder.group({
            email: ['', [
                Validators.required,
                // tslint:disable-next-line:max-line-length
                Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            ]],
            password: ['', Validators.required],
        });
    }

    /**
     * Authenticate the user.
     *
     * @param {any} credentials
     */
    private login(credentials: any): void {
        this.loading = true;
        const user = {
            email: credentials.email,
            password: credentials.password
        };

        this._loginService
            .authenticate(user)
            .subscribe(
            res => {
                this.loading = false;
                const token = {
                    accessToken: res.json().accessToken,
                    expirationDate: res.json().expiresAt
                };
                this._auth.setToken(token);
                this._auth.setProfile(res.json().profile);
                this._router.navigate(['/home']);
            },
            err => {
                this.loading = false;
                this.handle(err);
            }
            );
    }

    /**
     * Handle authentication errors.
     *
     * @param {any} errors
     */
    private handle(errors: any): void {
        if (errors.json().error) {
            swal({
                title: 'Whoops',
                text: errors.json().error,
                type: 'error',
                timer: 2000
            }).then(
                function () { },
                // Handling the promise rejection.
                function (dismiss) {
                    if (dismiss === 'timer') {
                        console.log('Alert was closed by the timer');
                    }
                }
                );
        } else if (errors.json()) {
            this.errors = [];
            let i = 0;
            errors.json().forEach((error) => {
                i++;
                this.errors.push(i + '. ' + error.msg);
            });
        }
    }
}
