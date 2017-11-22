import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { environment } from '../../../environments/environment';
import swal from 'sweetalert2';

@Component({
    moduleId: module.id,
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [RegisterService]
})

export class RegisterComponent implements OnInit {
    private registerForm: FormGroup;
    private loading = false;
    private errors: Array<any> = [];

    /**
     * Class constructor.
     *
     * @param {Router}          private _router
     * @param {FormBuilder}     private _formBuilder
     * @param {RegisterService} private _registerService
     */
    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _registerService: RegisterService) {}

    ngOnInit(): void {
        // Validate register form.
        this.registerForm = this._formBuilder.group({
            email: ['', [
                Validators.required,
                // tslint:disable-next-line:max-line-length
                Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            ]],
            password: ['', [
                Validators.required,
                Validators.minLength(8)
            ]],
            passwordConfirmation: ['', [
                Validators.required,
                Validators.minLength(8)
            ]]
        });
    }

    /**
     * Create a new account.
     *
     * @param {any} user
     */
    private register(user: any): void {
        this.loading = true;

        if (user.password !== user.passwordConfirmation) {
            this.loading = false;
            swal('Whoops', 'Passwords don\'t match! Please try again.', 'info');
            return;
        }

        const account = {
            email: user.email,
            password: user.password,
            passwordConfirmation: user.passwordConfirmation
        };

        this._registerService
            .create(account)
            .subscribe(
                res => {
                    this.loading = false;
                    this._router.navigate(['/login']);
                    swal({
                        title: 'Welcome to ' + environment.appName + ' ' + account.email,
                        text: res.json().message,
                        type: 'error',
                        timer: 2000
                    }).then(
                        function() {},
                        // Handling the promise rejection.
                        function(dismiss) {
                            if (dismiss === 'timer') {
                                console.log('Alert was closed by the timer');
                            }
                        }
                    );

                },
                err => {
                    this.loading = false;
                    this.handle(err);
                }
            );
    }

    /**
     * Handle registration errors.
     *
     * @param {any} errors
     */
    private handle(errors: any): void {
        if (errors.status === 500) {
            swal('Error', 'This email address was already taken.', 'error');
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
