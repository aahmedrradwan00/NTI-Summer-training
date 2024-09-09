import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
    providedIn: 'root',
})
export class WishlistService {
    private hostName: string = '';
    private routeName: string = '';
    constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
        this.hostName = this._GlobalService.hostName;
        this.routeName = this._GlobalService.wishlistRoute;
    }

    addProductToWishlist(product: string) {
        return this._HttpClient.post(`${this.hostName}${this.routeName}`, { product }, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } });
    }
}
