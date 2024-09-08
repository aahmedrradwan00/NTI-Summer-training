import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';

@Component({
    selector: 'app-products-details',
    standalone: true,
    imports: [CurrencyPipe],
    templateUrl: './products-details.component.html',
    styleUrl: './products-details.component.scss',
})
export class ProductsDetailsComponent implements OnInit, OnDestroy {
    subscription: any;
    id: string = '';
    imgDomain: string = '';
    product: any = {};
    constructor(
        private _AuthService: AuthService,
        private _ActivatedRoute: ActivatedRoute,
        private _ProductsService: ProductsService,
        private _WishlistService: WishlistService,
        private _CartService: CartService
    ) {}

    ngOnInit(): void {
        this._AuthService.checkToken();
        this.id = this._ActivatedRoute.snapshot.params['id'];
        this.imgDomain = this._ProductsService.imgDomain;
        this.subscription = this._ProductsService.getOneProduct(this.id).subscribe((res) => {
            this.product = res.data;
        });
    }
    addToCart(productId: string) {
        this._CartService.addProductToCart(productId).subscribe((res) => {
            alert('Product Added to Cart');
        });
    }

    addToWishlist(productId: string) {
        this._WishlistService.addProductToWishlist(productId).subscribe((res) => {
            alert('Product Added to WishList');
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
