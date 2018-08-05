import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products = [];
  filteredProducts = [];
  category;

  constructor(private route : ActivatedRoute, private productService : ProductService) { 

    this.productService.getAll().subscribe(p => {
      this.products = p;
      // Read query param and filter only after products fetched from DB
      this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;
      });
    });
  }

  ngOnInit() {
  }

}
