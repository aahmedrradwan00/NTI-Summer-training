import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { SubcategoriesService } from '../services/subcategories.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-update-product',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './update-product.component.html',
    styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit, OnDestroy {
    subscription: Subscription | undefined;
    categoriesSubscription: Subscription | undefined;
    subcategoriesSubscription: Subscription | undefined;
    product: any;
    categories: any[] = [];
    subcategories: any[] = [];
    getName: string = '';
    getDescription: string = '';
    getPrice: string = '0';
    getQuantity: string = '0';
    getCategory: string = '';
    getSubcategory: string = '';
    productCover: File | undefined;
    productImages: File[] = [];
    productErorr: string[] = [];
    id: string = '';

    setCover(event: any) {
        const cover = event.target.files[0];
        if (cover) {
            this.productCover = cover;
        }
    }

    setImages(event: any) {
        const images = event.target.files;
        if (images) {
            this.productImages = Array.from(images);
        }
    }

    constructor(
        private _AuthService: AuthService,
        private _ProductsService: ProductsService,
        private _SubcategoriesService: SubcategoriesService,
        private _CategoriesService: CategoriesService,
        private _Router: Router,
        private _ActivatedRoute: ActivatedRoute
    ) {}

    loadCategories() {
        this.categoriesSubscription = this._CategoriesService.getCategories(200, 1, 'name', '').subscribe({
            next: (res) => {
                this.categories = res.data;
            },
            error: (err) => {},
        });
    }

    loadSubcategories(categoryId: string) {
        this.getCategory = categoryId;
        this.subcategoriesSubscription = this._SubcategoriesService.getSpecificSubcategories(categoryId, 200, 'name').subscribe({
            next: (res) => {
                this.subcategories = res.data;
            },
            error: (err) => {},
        });
    }

    loadProduct(productId: string) {
        this.subscription = this._ProductsService.getProduct(productId).subscribe({
            next: (res) => {
                this.product = res.data;
            },
            error: (err) => {},
        });
    }

    updateProduct(productId: string) {
        const formData = new FormData();
        formData.append('name', this.getName);
        formData.append('description', this.getDescription);
        formData.append('category', this.getCategory);
        formData.append('subcategory', this.getSubcategory);
        formData.append('price', this.getPrice);
        formData.append('quantity', this.getQuantity);
        if (this.productCover) {
            formData.append('cover', this.productCover);
        }
        if (this.productImages && this.productImages.length > 0) {
            for (let i = 0; i < this.productImages.length; i++) {
                formData.append('images', this.productImages[i]);
            }
        }
        this._ProductsService.updateProduct(productId, formData).subscribe({
            next: (res) => {
                alert('Product updated successfully');
                this._Router.navigate(['/products']);
            },
            error: (err) => {
                err.error.errors.forEach((error: any, index: number) => {
                    this.productErorr[index] = error.msg;
                });
            },
        });
    }

    ngOnInit(): void {
        this._AuthService.checkToken();
        this.id = this._ActivatedRoute.snapshot.params['id'];
        this.loadCategories();
        this.loadProduct(this.id);
    }

    ngOnDestroy(): void {
        if (this.categoriesSubscription) {
            this.categoriesSubscription.unsubscribe();
        }
        if (this.subcategoriesSubscription) {
            this.subcategoriesSubscription.unsubscribe();
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
