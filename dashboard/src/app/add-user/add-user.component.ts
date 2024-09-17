import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Component({
    selector: 'app-add-user',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './add-user.component.html',
    styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
    userEmailError: string = '';
    userPasswordError: string = '';
    userForm = new FormGroup({
        name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
        confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
        role: new FormControl(null, [Validators.required]),
    });
    constructor(private _AuthService: AuthService, private _UsersService: UsersService, private _Router: Router) {}
    createUser(formData: FormGroup) {
        this._UsersService.createUser(formData.value).subscribe({
            next: (res) => {
                alert('user created successfully');
                this._Router.navigate(['/users']);

            },
            error: (err) => {
                err.error.errors.map((error: any) => {
                    if (error.path === 'email') {
                        this.userEmailError = error.msg;
                    }
                    if (error.path === 'password') {
                        this.userPasswordError = error.msg;
                    }
                });
            },
        });
    }

    ngOnInit(): void {
        this._AuthService.checkToken();
    }
}
