import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { UUID } from 'angular2-uuid';
import { ShoppingCart } from './models/shopping-cart';
import { take } from '../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db : AngularFireDatabase) { }

  getItemFromCart(cartId, itemId){
    return this.db.list('/shopping-carts/' + cartId).snapshotChanges();
  }

  async addToCart(product : Product){
    let cartId = await this.getOrCreateCartId()
    let item$ = this.getItem(cartId, product.id);
    
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      if(!item) item$.update({ product : product, quantity : 1 });
      //else item$.set({ product : product, quantity : item['quantity'] + 1 });
      else this.updateQuantity(product, 1);
    });
  }

  async removeFromCart(product : Product){
    this.updateQuantity(product, -1);
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      cartId : UUID.UUID(),
      dateCreated : new Date().getTime()
    });
  }

  async getCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  getItem(cartId : string, productId : string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() : Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return cartId;
  }

  private async updateQuantity(product: Product, change : number){
    let cartId = await this.getOrCreateCartId()
    let item$ = this.getItem(cartId, product.id);
    
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      item$.set({ product : product, quantity : item['quantity'] + change });
    });
  }
}