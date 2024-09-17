import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { GlobalService } from '../services/global.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrdersService } from '../services/orders.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
    subscription: any;
    cart: any = {};
    productsLength: number = 0;
    productImage: string = '';
    taxPrice: number = 100;
    couponError: string = '';
    getAddress: string = '';
    isLoading: boolean = false;
    isInputDisabled: boolean = false;
    couponForm = new FormGroup({
        name: new FormControl(null, [Validators.required]),
    });

    constructor(private _AuthService: AuthService, private _cartService: CartService, private _OrdersService: OrdersService, private _GlobalService: GlobalService, private _Router: Router) {}
    loadCart() {
        this.subscription = this._cartService.getUserCart().subscribe({
            next: (res) => {
                this.cart = res.data;
                this.productsLength = res.length;
            },
            error: (err) => {},
        });
    }

    removeItem(itemId: string) {
        this._cartService.removeProductFromCart(itemId).subscribe({
            next: (res) => {
                this.loadCart();
                alert('product removed from cart');
            },
            error: (err) => {},
        });
    }

    addCoupon(formData: FormGroup) {
        this.isLoading = true;
        this._cartService.applyCoupon(formData.value).subscribe({
            next: (res) => {
                this.loadCart();
                this.isLoading = false;
            },
            error: (err) => {
                this.couponError = err.error.message;
                this.isLoading = false;
            },
        });
    }

    clearCart() {
        this._cartService.clearCart().subscribe({
            next: (res) => {
                alert('cart cleared');
                this._Router.navigate(['/home']);
            },
            error: (err) => {},
        });
    }

    createOrder() {
        const formdata = {
            address: this.getAddress,
        };
        this._OrdersService.createOrder(formdata).subscribe({
            next: (res) => {
                this._Router.navigate(['/orders']);
                alert('Order created');
            },
            error: (err) => {
                console.log('Error details:', err.error, err.message, err.status);
            },
        });
    }

    ngOnInit(): void {
        this._AuthService.checkToken();
        this.productImage = this._GlobalService.productsImages;
        this.loadCart();
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
