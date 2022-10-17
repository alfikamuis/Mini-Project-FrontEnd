import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ShoppingModule } from '../shopping/shopping.module';
import { ProductsComponent } from '../shopping/components/products/products.component';
import { CartComponent } from '../shopping/components/cart/cart.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([

    ])
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
