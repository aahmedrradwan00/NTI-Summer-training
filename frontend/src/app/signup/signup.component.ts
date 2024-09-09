import { JsonPipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [ReactiveFormsModule, JsonPipe],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
})
export class SignupComponent {
    constructor(private _AuthService: AuthService, private _Router: Router) {}
    signupForm = new FormGroup({
        name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
        confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    });
    // subscription: any;
    emailErrors: string = '';
    passwordErrors: string = '';

    signup(formData: FormGroup) {
        this._AuthService.signup(formData.value).subscribe(
            (res) => {
                console.log(res);
                if (res.token) {
                    localStorage.setItem('user', res.token);
                    this._AuthService.saveCurrentUser();
                }
                this._Router.navigate(['/home']);
            },
            (err) => {
                console.log(err);
                
                console.log(JSON.stringify(err.error.errors));
                err.error.errors.map((err: any) => {
                    if (err.path === 'email') this.emailErrors = err.msg;
                    if (err.path === 'confirmPassword') this.passwordErrors = err.msg;
                });
            }
        );
    }
    // ngOnDestroy(): void {
    //     this.subscription.unsubscribe();
    // }
}
