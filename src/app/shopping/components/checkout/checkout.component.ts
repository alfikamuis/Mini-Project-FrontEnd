import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';
import { ICartServer } from 'src/app/shared/models/cart';
import { OrderService } from 'src/app/shared/services/order.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartData!: ICartServer;
  cartTotal!: number ;
  showSpinner!: boolean ;
  checkoutForm: any;

  constructor(private shoppingCartService: ShoppingCartService,
              private orderService: OrderService,
              private router: Router,
              private  spinner: NgxSpinnerService,
              private fb: FormBuilder) {

    this.checkoutForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],

    });


  }

  ngOnInit() {
    this.shoppingCartService.cartData$.pipe(take(1)).subscribe(data => this.cartData = data);
    this.shoppingCartService.cartTotal$.pipe(take(1)).subscribe(total => this.cartTotal = total);
  }

  onCheckout() {
   this.spinner.show().then(p => {
      this.shoppingCartService.checkout(1);
    });

  }
}
