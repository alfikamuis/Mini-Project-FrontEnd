import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ObservableInput, take } from 'rxjs';
import { ICart } from '../../models/cart';
import { IProduct } from '../../models/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  @Input ('product') product!: any;
  @Input ('show-actions') showAction!: boolean;

  constructor(
    private shoppingCartService:ShoppingCartService,
    private router:Router
    ) { 
  }

  ngOnInit(): void {
   
  }

  selectProduct(id:number) {
    this.router.navigate(['/products/' + id]).then();
  }

  addToCart(){
    this.shoppingCartService.addProductToCart(this.product.id);
  }

}
