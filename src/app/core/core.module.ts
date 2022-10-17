import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ShoppingModule } from '../shopping/shopping.module';
import { ProductsComponent } from '../shopping/components/products/products.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path:'', component: ProductsComponent},
    ])
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
