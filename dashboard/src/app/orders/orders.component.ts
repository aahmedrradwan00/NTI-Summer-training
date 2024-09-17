import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OrdersService } from '../services/orders.service';
import { ProductsService } from '../services/products.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  subscription: any;
  orders: any[] = [];
  productsImage: string = '';
  pagination: any = {};
  page: number = 1;
  search: string = '';
  constructor(private _AuthService: AuthService, private _OrdersService: OrdersService, private _ProductsService: ProductsService) { }

  loadOrders() {
    this.subscription = this._OrdersService.getOrders(50, this.page, '-createdAt', this.search).subscribe({
      next: (res) => {
        console.log(res);
        this.orders = res.data;
        this.pagination = res.pagination;
      }, error: (err) => { }
    })
  }

  updateDelivered(orderId: string) {
    this._OrdersService.updateDeliveredOrder(orderId).subscribe({
      next: (res) => {
        this.loadOrders();
        alert('Order is delivered')
      }, error: (err) => { }
    })
  }

  updatePaid(orderId: string) {
    this._OrdersService.updatePaidOrder(orderId).subscribe({
      next: (res) => {
        this.loadOrders();
        alert('Order is Paid')
      }, error: (err) => { }
    })
  }

  changePage(page: number) {
    this.page = page;
    this.loadOrders();
  }

  searchData(searchData: string) {
    this.search = searchData;
    this.loadOrders();
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productsImage = this._ProductsService.productsImages;
    this.loadOrders();
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() };
}
