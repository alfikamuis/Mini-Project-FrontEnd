import { Component, OnInit } from '@angular/core';
import { ICartServer } from 'src/app/shared/models/cart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartData!: ICartServer;
  cartTotal!: number;
  subTotal: any = 0;

  constructor(public shoppingCartService: ShoppingCartService) {
    
  }

  ngOnInit() {
     this.shoppingCartService.cartData$.subscribe(data => this.cartData = data);
     this.shoppingCartService.cartTotal$.subscribe(total => this.cartTotal = total);
     this.calculateTotal(this.subTotal);
  }

  calculateTotal(index:any){
    this.subTotal = this.shoppingCartService.CalculateSubTotal(index)
  }

  delete(index: any){
    this.shoppingCartService.deleteProductFromCart(index)
  }

  ChangeQuantity(id: number, increaseQuantity: boolean) {
    this.shoppingCartService.updateCartItems(id, increaseQuantity);
  }

}
