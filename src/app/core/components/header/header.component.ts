import { Component, OnInit } from '@angular/core';
import { ICartServer } from 'src/app/shared/models/cart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collapsed = true;
  cartData!: ICartServer;
  cartTotal!: number;
  authState!: boolean;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.shoppingCartService.cartTotal$.subscribe(total => {
      this.cartTotal = total;
    });

    this.shoppingCartService.cartData$.subscribe(data => this.cartData = data);
    this.userService.authState$.subscribe(authState => this.authState = authState);
  }

  delete(i: any) {
    this.shoppingCartService.deleteProductFromCart(i);
  }


}
