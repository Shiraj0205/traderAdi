import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription, Observable } from 'node_modules/rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products = [];
  filteredProducts = [];
  category;
  cart$ : Observable<ShoppingCart>;
  subscription : Subscription;

  constructor(private route : ActivatedRoute, 
              private productService : ProductService,
              private shoppingCartService : ShoppingCartService ) { 

  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts(){
    this.productService.getAll().subscribe(p => {
      this.products = p;
      // Read query param and filter only after products fetched from DB
      this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.applyfilter();
    });
  });
  }
  
  private applyfilter(){
    this.filteredProducts = (this.category) ? 
    this.products.filter(p => p.category === this.category) : 
    this.products;
  }
}
