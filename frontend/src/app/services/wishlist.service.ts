import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs/internal/Observable';

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
    
    getUserWishlist(): Observable<any> {
        return this._HttpClient.get(`${this.hostName}${this.routeName}`, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } });
    }

    addProductToWishlist(product: string): Observable<any> {
        return this._HttpClient.post(`${this.hostName}${this.routeName}`, { product }, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } });
    }

    removeProductToWishlist(item: string): Observable<any> {
        return this._HttpClient.delete(`${this.hostName}${this.routeName}/${item}`, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } });
    }
}
