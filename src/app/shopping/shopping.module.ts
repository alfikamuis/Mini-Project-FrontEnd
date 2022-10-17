import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductFilterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: 'products', component: ProductsComponent},
      // {path: 'cart', component: CartComponent},
      // {path: 'checkout', component: CheckoutComponent},
      // {path: 'order-success/:id', component: OrderSuccessComponent},
      // {path: 'my-orders', component: MyOrdersComponent}
    ])
  ]
})
export class ShoppingModule { }
