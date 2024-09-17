import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-forget-password',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './forget-password.component.html',
    styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
    sendMailError: string = '';
    verifyCodeError: string = '';
    resetPasswordError: string = '';
    sendMailFlag: boolean = false;
    verifyCodeFlag: boolean = false;
    sendMailForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
    });
    verifyCodeForm = new FormGroup({
        resetCode: new FormControl(null, [Validators.required, Validators.maxLength(6)]),
    });
    resetPasswordForm = new FormGroup({
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });

    constructor(private _AuthService: AuthService, private _Router: Router) {}

    sendMail(formData: FormGroup) {
      console.log(formData.value);
        this._AuthService.sendMail(formData.value).subscribe({
            next: (res) => {
              console.log("11");
                localStorage.setItem('verify', res.resetToken);
                this.sendMailFlag = true;
            },
            error: (err) => (this.sendMailError = err.error.message),
        });
    }

    verifyCode(formData: FormGroup) {
        this._AuthService.verifyCode(formData.value).subscribe({ next: (res) => (this.verifyCodeFlag = true), error: (err) => (this.verifyCodeError = err.error.message) });
    }

    resetPassword(formData: FormGroup) {
        this._AuthService.resetPassword(formData.value).subscribe({
            next: (res) => {
                localStorage.removeItem('verify');
                this.sendMailFlag = false;
                this.verifyCodeFlag = false;
                this._Router.navigate(['/account/login']);
            },
            error: (err) => {
                console.log(err.error);
                this.resetPasswordError = err.error.errors[0].msg;
            },
        });
    }
}
