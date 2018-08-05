import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser : AppUser;
  cart : any;
  shoppingCartItemCount : number = 0;

  constructor(private auth : AuthService, private shoppingCartService : ShoppingCartService) { 
  }

  logout(){
    this.auth.logout();
  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    let cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      let items = cart['items'];
      this.shoppingCartItemCount = 0;

      for(let productId in items)
        this.shoppingCartItemCount += items[productId].quantity;

    });

  }
}
