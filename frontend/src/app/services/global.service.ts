import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GlobalService {
    hostName: string = 'http://localhost:3000';
    authRoute: string = '/api/v1/auth';
    wishlistRoute: string = '/api/v1/wishlist';
    cartRoute: string = '/api/v1/carts';
    productsRoute: string = '/api/v1/products';
    reviewsRoute: string = '/api/v1/reviews';
    usersRoute: string = '/api/v1/users';
    orderRoute: string = '/api/v1/orders';
    productsImages: string = `${this.hostName}/products/`;
    userImage: string = `${this.hostName}/users/`;
    constructor() {}
}
