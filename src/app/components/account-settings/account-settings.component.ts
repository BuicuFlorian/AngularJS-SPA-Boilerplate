import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AccountSettingsService } from '../../services/account-settings.service';
import { IPasswords } from '../../types/IPasswords';
import swal from 'sweetalert2';

@Component({
    moduleId: module.id,
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.css'],
    providers: [AccountSettingsService]
})

export class AccountSettingsComponent implements OnInit {
    private changePasswordForm: FormGroup;
    private errors: Array<any> = [];
    private loading = false;
    private emailAddress: string;

    /**
     * Class constructor.
     *
     * @param {Router}                 private _router
     * @param {AuthService}            private _auth
     * @param {FormBuilder}            private _formBuilder
     * @param {AccountSettingsService} private _accountSettingsService
     */
    constructor(
        private _router: Router,
        private _auth: AuthService,
        private _formBuilder: FormBuilder,
        private _accountSettingsService: AccountSettingsService) { }

    ngOnInit(): void {
        this.emailAddress = this._auth.getProfile().email;

        // Validate update password form.
        this.changePasswordForm = this._formBuilder.group({
            currentPassword: ['', [
                Validators.required,
                Validators.minLength(8)
            ]],
            newPassword: ['', [
                Validators.required,
                Validators.minLength(8)
            ]],
            newPasswordConfirmation: ['', [
                Validators.required,
                Validators.minLength(8)
            ]]
        });
    }

    /**
     * Update the password of an account.
     *
     * @param {IPasswords} passwords
     */
    private updatePassword(passwords: IPasswords): void {
        this.loading = true;


        if (passwords.newPassword !== passwords.newPasswordConfirmation) {
            this.loading = false;
            swal('Whoops', 'Passwords don\'t match! Please try again.', 'info');
            return;
        }


        this._accountSettingsService
            .changePassword(passwords, this.emailAddress)
            .subscribe(
            res => {
                this.loading = false;
                swal({
                    title: 'Success',
                    text: res.json().message,
                    type: 'success',
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

                this.changePasswordForm.reset();
            },
            err => {
                this.loading = false;
                this.handle(err);
            }
            );
    }

    /**
     * Handle update password errors.
     *
     * @param {any} errors
     */
    private handle(errors: any): void {
        if (errors.json().error) {
            swal({
                title: 'Error',
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
