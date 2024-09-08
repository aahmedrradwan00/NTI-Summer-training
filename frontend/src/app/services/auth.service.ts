import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Signup } from '../interfaces/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // onInit
    // onChange
    // onDestroy
    constructor(private _HttpClient: HttpClient,private _Router:Router) {
        if (localStorage.getItem('user') !== null) {
            this.saveCurrentUser();
        }
    }
    currentUser = new BehaviorSubject(null);
    saveCurrentUser() {
        const token: any = localStorage.getItem('user');
        this.currentUser.next(jwtDecode(token));
    }
    checkToken() {
        const token: any = localStorage.getItem('user');
        const decodeToken = jwtDecode(token);
        if (decodeToken.exp! < Date.now() / 1000) {
            this.logout()
            this._Router.navigate(['/login'])        }
    }
    signup(formData: Signup): Observable<any> {
        return this._HttpClient.post('http://localhost:3000/api/v1/auth/signup', formData);
    }
    login(formData: Login): Observable<any> {
        return this._HttpClient.post('http://localhost:3000/api/v1/auth/login', formData);
    }
    logout() {
        localStorage.removeItem('user');
        this.currentUser.next(null);
    }
}
