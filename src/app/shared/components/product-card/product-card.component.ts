import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart : ShoppingCart;
  @Input() rating: number;
  @Input() itemId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(private cartService : ShoppingCartService) { 
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

  inputName: string;
  ngOnInit() {
    this.inputName = this.itemId + '_rating';
  }
  
  onClick(rating: number): void {
    this.rating = rating;
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: rating
    });
  }

}
