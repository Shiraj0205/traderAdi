import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db : AngularFireDatabase) { }

  save(product){
    this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products').valueChanges();
  }

  get(productId){
    return this.db.list('/products/', ref => ref.orderByChild('id').equalTo(productId)).valueChanges();
  }

  update(productId, product){
    return this.db.list('/products/', ref => ref.orderByChild('id').equalTo(productId)).snapshotChanges().subscribe(p => {
      return this.db.object('/products/' + p[0].key).update({ title: product.title, price : product.price, category : product.category, imageUrl : product.imageUrl });
    });
  }

  delete(productId){
    return this.db.list('/products/', ref => ref.orderByChild('id').equalTo(productId)).snapshotChanges().subscribe(p => {
      return this.db.object('/products/' + p[0].key).remove();
    });
  }
}