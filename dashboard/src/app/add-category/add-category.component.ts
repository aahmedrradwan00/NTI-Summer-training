import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CategoriesService } from '../services/categories.service';

@Component({
    selector: 'app-add-category',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './add-category.component.html',
    styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent implements OnInit {
    categoryError: string = '';
    categoryForm = new FormGroup({
        name: new FormControl(null, [Validators.required]),
    });
    constructor(private _AuthService: AuthService, private _CategoriesService: CategoriesService, private _Router: Router) {}

    createCategory(formData: FormGroup) {
        this._CategoriesService.createCategory(formData.value).subscribe({
            next: (res) => {
                alert('Category created');
                this._Router.navigate(['/categories']);
            },
            error: (err) => (this.categoryError = err.error.message),
        });
    }

    ngOnInit(): void {
        this._AuthService.checkToken();
    }
}
