import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from "@angular/router"; 
import { OrderService } from "../../../shared/services/order.service";
import { AuthService } from "../../../shared/services/auth.service";
import { Subscription } from "rxjs/Subscription";
import { Order } from "../../../shared/models/order";
import { ShoppingCart } from "../../../shared/models/shopping-cart";

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  userId: string;
  shipping = {};
  @Input('cart') cart:ShoppingCart;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let orderId = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', orderId.key])

  }


}
