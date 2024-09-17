import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CouponsService } from '../services/coupons.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
    selector: 'app-update-coupon',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './update-coupon.component.html',
    styleUrl: './update-coupon.component.scss',
})
export class UpdateCouponComponent {
    subscription: any;
    coupon: any = {};
    couponError: string = '';
    id: string = '';
    couponForm = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        discount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(99)]),
        expireTime: new FormControl(null, [Validators.required]),
    });
    constructor(private _AuthService: AuthService, private _CouponsService: CouponsService, private _Router: Router, private _ActivatedRoute: ActivatedRoute) {}

    loadCoupon(couponId: string) {
        this.subscription = this._CouponsService.getCoupon(couponId).subscribe({
            next: (res) => {
                this.coupon = res.data;
                this.couponForm.patchValue({
                    name: this.coupon?.name,
                    discount: this.coupon?.discount?.toString(),
                    expireTime: this.coupon?.expireTime,
                });
            },
            error: (err) => {},
        });
    }

    updateCoupon(couponId: string, formData: FormGroup) {
        const updatedValues = {
            name: formData.value.name || this.coupon.name,
            discount: formData.value.discount || this.coupon.discount,
            expireTime: new DatePipe(this.coupon.expireTime).transform || this.coupon.expireTime,
        };
        this._CouponsService.updateCoupon(couponId, updatedValues).subscribe({
            next: () => {
                alert('Coupon updated successfully');
                this._Router.navigate(['/coupons']);
            },
            error: (err) => {
                this.couponError = err.error.errors[0]?.msg || 'An error occurred';
            },
        });
    }

    ngOnInit(): void {
        this._AuthService.checkToken();
        this.id = this._ActivatedRoute.snapshot.params['id'];
        this.loadCoupon(this.id);
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
