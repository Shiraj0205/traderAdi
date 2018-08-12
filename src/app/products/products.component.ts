import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'node_modules/rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products = [];
  filteredProducts = [];
  category;
  cart : any;
  subscription : Subscription;

  constructor(private route : ActivatedRoute, 
              private productService : ProductService,
              private shoppingCartService : ShoppingCartService ) { 

      this.productService.getAll().subscribe(p => {
        this.products = p;
        // Read query param and filter only after products fetched from DB
        this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;
      });
    });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
        .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
