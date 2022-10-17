import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  dataProducts: IProduct[]=[];
  filterProducts: IProduct[]=[];
  category!: string | null;
  pages!: number;

  constructor(
    private productService: ProductService,
    public route: ActivatedRoute
  ) {

    //pages
    this.pages = 20;

    route.queryParamMap.subscribe(data => {
      this.category = data.get('category')
      this.filterProducts = (this.category) ?
        this.dataProducts.filter(fill => fill.category === this.category) :
        this.dataProducts;
    })
  }


  ngOnInit(): void {

    this.productService.getAll(this.pages).pipe(take(1)).subscribe((data:any) => {
      this.filterProducts = this.dataProducts = data.products;
    });

  }

}
