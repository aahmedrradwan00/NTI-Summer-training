import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
    isLogin: boolean = false;
    user: any;
    constructor(private _AuthService: AuthService, private _Router: Router, private _ProfileService: ProfileService) {
        // if (_AuthService.currentUser !== null) this.isLogin = true;
        // else this.isLogin = false;
        _AuthService.currentUser.subscribe(() => {
            if (_AuthService.currentUser.getValue() !== null) this.isLogin = true;
            else this.isLogin = false;
        });
    }

    loadUser() {
        this._ProfileService.getUser().subscribe({
            next: (res) => {
                this.user = res.data;
            },
        });
    }

    logout() {
        this._AuthService.logout();
        this._Router.navigate(['/account/login']);
    }
    ngOnInit(): void {
        this.user = this._AuthService.currentUser.getValue();
        this.loadUser()
    }
}
