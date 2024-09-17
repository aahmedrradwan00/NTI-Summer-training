import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CategoriesService } from '../services/categories.service';
import { SubcategoriesService } from '../services/subcategories.service';

@Component({
    selector: 'app-update-subcategory',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, CommonModule],
    templateUrl: './update-subcategory.component.html',
    styleUrl: './update-subcategory.component.scss',
})
export class UpdateSubcategoryComponent implements OnInit, OnDestroy {
    subscription: any;
    subcategory: any;
    category: any;
    subcategoryError: string = '';
    subscriptionCategories: any;
    categories: any[] = [];
    id: string = '';
    subcategoryForm = new FormGroup({
        name: new FormControl(null),
        category: new FormControl(null),
    });

    categoryError: any;
    constructor(
        private _AuthService: AuthService,
        private _SubcategoriesService: SubcategoriesService,
        private _CategoriesService: CategoriesService,
        private _Router: Router,
        private _ActivatedRoute: ActivatedRoute
    ) {}

    loadSubcategory(subcategoryId: string) {
        this.subscription = this._SubcategoriesService.getSubcategory(subcategoryId).subscribe({
            next: (res) => {
                this.subcategory = res.data;
                this.subcategoryForm.patchValue({
                    name: res.data.name,
                    category: res.data.category._id,
                });
            },
            error: (err) => (this.subcategoryError = err.error.message),
        });
    }

    getAllCategories() {
        this.subscriptionCategories = this._CategoriesService.getCategories(200, undefined, 'name', '').subscribe({
            next: (res) => {
                this.categories = res.data;
            },
        });
    }

    updateSubcategory(subcategoryId: string, formData: FormGroup) {
        this._SubcategoriesService.updateSubcategory(subcategoryId, formData.value).subscribe({
            next: (res) => {
                alert('Subcategory updated');
                this._Router.navigate(['/subcategories']);
            },
            error: (err) => {
                console.log(err.error);
                this.subcategoryError = err.error.errors[0];
            },
        });
    }

    ngOnInit(): void {
        this._AuthService.checkToken();
        this.id = this._ActivatedRoute.snapshot.params['id'];
        this.loadSubcategory(this.id);
        this.getAllCategories();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.subscriptionCategories.unsubscribe();
    }
}
