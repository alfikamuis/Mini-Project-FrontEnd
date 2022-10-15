import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, switchMap } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: IProduct[] = [];
  filterProducts: IProduct[] = [];
  category!: string | null;

  constructor(
    private productService: ProductService,
    public route: ActivatedRoute
  ) {

    productService.getAll().pipe(take(1)).subscribe(data => {
      this.products = data;
    });

    route.queryParamMap.subscribe(data => {
      this.category = data.get('category')
      this.filterProducts = (this.category) ?
        this.products.filter(fill => fill.category === this.category) :
        this.products;
    })
  }

  // ngOnDestroy(): void {
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit(): void {

    this.productService.getAll().pipe(take(1)).subscribe(data => {
      this.filterProducts = data;
    });

  }

}
