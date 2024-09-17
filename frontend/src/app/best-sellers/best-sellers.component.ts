import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe } from '@angular/common';
import { DescriptionPipe } from '../pipes/description.pipe';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-best-sellers',
    standalone: true,
    imports: [CurrencyPipe, DescriptionPipe, RouterLink],
    templateUrl: './best-sellers.component.html',
    styleUrl: './best-sellers.component.scss',
})
export class BestSellersComponent implements OnInit, OnDestroy {
    products: any[] = [];
    search: string = '';
    subscription: any;
    imgDomain: string = '';
    constructor(private _ProductsService: ProductsService, private _AuthService: AuthService, private _CartService: CartService, private _Router: Router) {}
    ngOnInit(): void {
        // this._AuthService.checkToken();
        this.imgDomain = this._ProductsService.productImages;
        this.subscription = this._ProductsService.getProducts(16, 1, '-sold', this.search).subscribe((res) => {
            this.products = res.data;
            console.log(res.data);
        });
    }
    addToCart(productId: string) {
        if (this._AuthService.isLoggedIn()) {
            this._CartService.addProductToCart(productId).subscribe((res) => {
                alert('Product Added to cart');
            });
        } else this._Router.navigate(['/login']);
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
