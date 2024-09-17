import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe } from '@angular/common';
import { DescriptionPipe } from '../pipes/description.pipe';
import { RouterLink } from '@angular/router';
import { Pagination } from '../interfaces/pagination';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [CurrencyPipe, DescriptionPipe, RouterLink, FormsModule],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
    imgDomain: string = '';
    subscription: any;
    products: any[] = [];
    page: number = 1;
    search: string = '';
    pagination: Pagination = {};

    constructor(private _AuthService: AuthService, private _ProductsService: ProductsService, private _CartService: CartService) {}

    getAllProducts() {
        this.imgDomain = this._ProductsService.productImages;
        this.subscription = this._ProductsService.getProducts(16, this.page, undefined, this.search).subscribe((res) => {
            this.products = res.data;
            this.pagination = res.pagination;
        });
    }

    filterItems(filteredItems: any) {
        this.filterItems = filteredItems;
        this.getAllProducts();
    }
    changePage(page: number) {
        this.page = page;
        this.getAllProducts();
    }
    searchProduct(word: string) {
        this.search = word;
        this.getAllProducts();
    }

    addToCart(productId: string) {
        this._CartService.addProductToCart(productId).subscribe((res) => {
            alert('Product Added to cart');
        });
    }
    ngOnInit(): void {
        // this._AuthService.checkToken();
        this.getAllProducts();
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
