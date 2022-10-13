import { Component, Input, OnInit } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { IProduct } from '../../models/product';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  @Input ('product') product!: any;
  @Input ('show-actions') showAction: boolean = false;

  imgUrl = "../../../../assets/img/dummy-product_2.png";

  constructor() { 
  }

  ngOnInit(): void {
  }

}
