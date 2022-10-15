import { Component, Input, OnInit } from '@angular/core';
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

  // cart: ICart = {
  //   id: 0,
  //   createdAt: new Date().getTime()
  // };

  constructor(private shoppingCartService:ShoppingCartService) { 
  }

  ngOnInit(): void {
   
  }

  addToCart(){
    this.shoppingCartService.addToCart(this.product);
    // let s:any = localStorage.getItem('cartId');
    // let s$ = this.shoppingCartService.getItem(s,this.product.id);
    // s$.then(data=>data.subscribe(para=>{
    //   console.log(para.quantity);
    // })).catch(err=>{console.log(err)})
  }

}
