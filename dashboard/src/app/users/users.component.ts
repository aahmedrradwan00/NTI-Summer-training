import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, OnDestroy {
    subscription: any;
    userSubscription: any;
    users: any[] = [];
    user: any;
    page: number = 1;
    search: any = '';
    pagination: any = {};
    role: string = '';
    userImage: string = '';
    constructor(private _AuthService: AuthService, private _UsersService: UsersService) {}

    loadUsers() {
        this.subscription = this._UsersService.getUsers(undefined, this.page, 'name', this.search, this.role).subscribe({
            next: (res) => {
                this.users = res.data;
                this.pagination = res.pagination;
            },
            error: (err) => {},
        });
    }

    changeUserActive(userId: string) {
        this.userSubscription = this._UsersService.getUser(userId).subscribe({
            next: (res) => {
                this.user = res.data;
                this._UsersService.updateUser(userId, { active: !this.user.active }).subscribe({
                    next: (res) => {
                        this.loadUsers();
                        alert('user activation updated');
                    },
                });
            },
            error: (err) => {},
        });
    }

    deleteUser(userId: string) {
        this._UsersService.deleteUser(userId).subscribe({
            next: (res) => {
                alert('User deleted');
                this.loadUsers();
            },
            error: (err) => {},
        });
    }

    filterUsers(filter: string) {
        this.role = filter;
        this.loadUsers();
    }

    changePage(page: number) {
        this.page = page;
        this.loadUsers();
    }

    searchData(data: string) {
        this.search = data;
        this.loadUsers();
    }

    ngOnInit(): void {
        this._AuthService.checkToken();
        this.userImage = this._UsersService.userImage;
        this.role = 'user';
        this.loadUsers();
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        if (this.userSubscription) this.userSubscription.unsubscribe();
    }
}
