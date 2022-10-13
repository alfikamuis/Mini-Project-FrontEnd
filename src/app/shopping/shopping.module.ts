import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductsComponent } from './components/products/products.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'products', component: ProductsComponent},
      {path: 'cart', component: CartComponent},
      {path: 'checkout', component: CheckoutComponent},
      {path: 'order-success/:id', component: OrderSuccessComponent},
      {path: 'my-orders', component: MyOrdersComponent}
    ])
  ]
})
export class ShoppingModule { }
