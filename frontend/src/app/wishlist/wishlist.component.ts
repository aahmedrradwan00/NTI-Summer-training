import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { WishlistService } from '../services/wishlist.service';
import { GlobalService } from '../services/global.service';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-wishlist',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './wishlist.component.html',
    styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit, OnDestroy {
    subscription: any;
    wishlist: any[] = [];
    wishlistLength: number = 0;
    productImage: string = '';
    constructor(private _AuthService: AuthService, private _wishlistService: WishlistService, private _GlobalService: GlobalService, private _cartService: CartService) {}

    loadWishlist() {
        this.subscription = this._wishlistService.getUserWishlist().subscribe({
            next: (res) => {
                this.wishlist = res.data;
                this.wishlistLength = res.length;
            },
        });
    }

    removeFromWishlist(productId: string) {
        this._wishlistService.removeProductToWishlist(productId).subscribe({
            next: (res) => {
                this.loadWishlist();
                alert('product remove form wishlist');
            },
            error: (err) => {},
        });
    }

    addToCart(productId: string) {
        this._cartService.addProductToCart(productId).subscribe({
            next: (res) => {
                alert('product add to cart');
            },
            error: (err) => {},
        });
    }

    ngOnInit(): void {
        this._AuthService.checkToken();
        this.productImage = this._GlobalService.productsImages;
        this.loadWishlist();
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
