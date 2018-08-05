import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ActivatedRoute } from 'node_modules/@angular/router';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$;
  @Input('category') category;

  constructor(private categoryService : CategoryService) { 
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit() {
  }
}
