import { query } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, take } from 'rxjs';
import { IProduct, IResponseProduct } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit{

  dataProducts!: IProduct[];
  filterProducts!: IProduct[];
  pages!:number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    
    //set pages
    this.pages = 20;
  }

  ngOnInit(): void {
    this.productService.getAll(this.pages).subscribe((data:any) => {
      this.filterProducts = this.dataProducts = data.products;
    });
  }

  deleteById(productId: number) {
    this.productService.delete(productId).pipe(take(1)).subscribe(data => {
      alert("delete success")
      this.ngOnInit();
    });
  }

  filter(query: string) {
    this.filterProducts = (query) ? this.dataProducts
      .filter(data => data.name.toLowerCase().includes(query.toLowerCase())) :
      this.dataProducts;
  }

}
