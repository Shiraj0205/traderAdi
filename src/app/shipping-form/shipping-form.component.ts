import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from '../../../node_modules/rxjs';
import { Order } from '../models/order';
import { Router } from '../../../node_modules/@angular/router';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  shipping = {}; 
  userId : string;
  userSubscription : Subscription;
  @Input('cart') cart : ShoppingCart;
  constructor(
    private router : Router,
    private authService : AuthService,
    private orderService : OrderService){
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    console.log(result);
    this.router.navigate(['/order-success', result.key]);
  }

}
