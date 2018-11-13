import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable, Subscription } from '../../../node_modules/rxjs';

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
