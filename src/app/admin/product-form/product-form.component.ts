import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',   
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = { title : '', model : '', price : '', category : '', imageUrl : '', description : ''};
  id;

  constructor(private router : Router, 
    private route : ActivatedRoute,
    private categoryService : CategoryService, 
    private productService : ProductService) { 
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) 
    this.productService.get(this.id).subscribe(p => {
      this.product = {
        title : p[0]['title'],
        model : p[0]['model'],
        price : p[0]['price'],
        category : p[0]['category'],
        imageUrl : p[0]['imageUrl'],
        description : p[0]['description']
      }
    });
  }

  ngOnInit() {
  }

  save(product){
    if(this.id) this.productService.update(this.id, product);
    else{
      product.id = UUID.UUID();
      this.productService.save(product);
    }
    
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Are you sure you want to delete this product?')) return;
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
  }

  back(){
    this.router.navigate(['/admin/products']);
  }
}
