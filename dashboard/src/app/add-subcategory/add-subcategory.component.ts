import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CategoriesService } from '../services/categories.service';
import { SubcategoriesService } from '../services/subcategories.service';

@Component({
    selector: 'app-add-subcategory',
    standalone: true,
    imports: [ReactiveFormsModule,RouterLink],
    templateUrl: './add-subcategory.component.html',
    styleUrl: './add-subcategory.component.scss',
})
export class AddSubcategoryComponent {
    subscription: any;
    categories: any[] = [];
    subcategory: any = {};
    subcategoryError: string = '';
    subcategoryForm = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        category: new FormControl(null, [Validators.required]),
    });
    constructor(private _AuthService: AuthService, private _SubcategoriesService: SubcategoriesService, private _CategoriesService: CategoriesService, private _Router: Router) {}

    getAllCategories() {
        this.subscription = this._CategoriesService.getCategories(200, undefined, 'name', '').subscribe({
            next: (res) => {
                this.categories = res.data;
            },
        });
    }

    createSubcategory(formData: FormGroup) {
        this._SubcategoriesService.createSubcategory(formData.value).subscribe({
            next: (res) => {
                alert('subcategory added');
                this._Router.navigate(['/subcategories']);
            },
            error: (err) => {
                this.subcategoryError = err.error.errors[0].msg;
            },
        });
    }

    ngOnInit(): void {
        this._AuthService.checkToken();
        this.getAllCategories();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
