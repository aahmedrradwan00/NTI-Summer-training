import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewsService } from '../services/reviews.service';

@Component({
    selector: 'app-products-details',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './products-details.component.html',
    styleUrl: './products-details.component.scss',
})
export class ProductsDetailsComponent implements OnInit, OnDestroy {
    subscription: any;
    id: string = '';
    imgDomain: string = '';
    product: any = {};
    reviewError: string = '';
    reviewForm = new FormGroup({
        comment: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
        rating: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)]),
    });
    constructor(
        private _AuthService: AuthService,
        private _ActivatedRoute: ActivatedRoute,
        private _ProductsService: ProductsService,
        private _WishlistService: WishlistService,
        private _CartService: CartService,
        private _ReviewsService: ReviewsService
    ) {}

    loadProduct() {
        this.subscription = this._ProductsService.getOneProduct(this.id).subscribe((res) => {
            this.product = res.data;
        });
    }

    addReview(productId: string, formData: FormGroup) {
        this._ReviewsService.addReview(productId, formData.value).subscribe({
            next: (res) => {
                this.loadProduct();
                alert('Review Added');
            },
            error: (err) => {
                if (err.error.errors) {
                    err.error.errors.map((error: any) => {
                        console.log(formData);
                        if (error.path === 'product') this.reviewError = error.msg;
                    });
                } else {
                    this.reviewError = `You Must Login to add review`;
                    console.log(err);
                    console.log(formData);
                }
            },
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

    ngOnInit(): void {
        // this._AuthService.checkToken();
        this.id = this._ActivatedRoute.snapshot.params['id'];
        this.imgDomain = this._ProductsService.productImages;
        this.loadProduct();
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
