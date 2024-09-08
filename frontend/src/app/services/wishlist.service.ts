import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class WishlistService {
    private hostName: string = 'http://localhost:3000';
    private routeName: string = '/api/v1/wishlist';
    constructor(private _HttpClient: HttpClient) {}

    addProductToWishlist(product: string) {
        return this._HttpClient.post(`${this.hostName}${this.routeName}`, { product }, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } });
    }
}
