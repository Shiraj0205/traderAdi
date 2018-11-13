import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { UUID } from 'angular2-uuid';
import { ShoppingCart } from './models/shopping-cart';
import { take, map } from '../../node_modules/rxjs/operators';

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
      if(!item) item$.update({ 
        title : product.title,
        imageUrl : product.imageUrl,
        price : product.price, 
        quantity : 1 
      });
      else this.updateItem(product, 1);
    });
  }

  async removeFromCart(product : Product){
    this.updateItem(product, -1);
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      cartId : UUID.UUID(),
      dateCreated : new Date().getTime()
    });
  }

  async getCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
    .pipe(map(x => new ShoppingCart(x['items'])));
  }

  getItem(cartId : string, productId : string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId + '/items ').remove();
  }

  private async getOrCreateCartId() : Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return cartId;
  }

  private async updateItem(product: Product, change : number){
    let cartId = await this.getOrCreateCartId()
    let item$ = this.getItem(cartId, product.id);
    
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      let quantity = item['quantity'] + change;
      if(quantity === 0) item$.remove();
      else item$.set({ 
        title : product.title,
        imageUrl : product.imageUrl,
        price : product.price,
        quantity : quantity });
    });
  }
}