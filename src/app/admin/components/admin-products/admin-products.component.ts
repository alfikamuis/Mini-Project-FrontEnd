import { query } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, take } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  dataProducts!: { title: string }[];
  filterProducts!: any[];
  private ngUnsubscribe = new Subject();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {

    this.productService.getAll().pipe(take(1)).subscribe(data => {
      this.filterProducts = this.dataProducts = data;
    });
  }

  ngOnInit(): void {
    this.productService.getAll().pipe(take(1)).subscribe(data => {
      this.filterProducts = this.dataProducts = data;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.complete();
  }

  deleteById(productId: number) {
    this.productService.delete(productId).pipe(take(1)).subscribe(data => {
      console.log("delete success")
      this.ngOnInit();
    });
  }

  filter(query: string) {
    this.filterProducts = (query) ? this.dataProducts
      .filter(data => data.title.toLowerCase().includes(query.toLowerCase())):
      this.dataProducts;
  }

}
