import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileGuard } from '../shared/guard/profile.guard';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductFilterComponent,
    CartComponent,
    CheckoutComponent,
    ThankyouComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '',component:ProductsComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'cart', component: CartComponent},
      {path: 'checkout', component: CheckoutComponent}, //canActivate:[ProfileGuard]
      {path: 'thankyou', component: ThankyouComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      { path: 'profile', component: ProfileComponent, },  //canActivate:[ProfileGuard]
      {path: '**', pathMatch: 'full', redirectTo: ''}
      // {path: 'my-orders', component: MyOrdersComponent}
    ])
  ]
})
export class ShoppingModule { }
