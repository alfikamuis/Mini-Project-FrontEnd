import { NgModule } from '@angular/core';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormProductsComponent } from './components/form-products/form-products.component';



@NgModule({
  declarations: [
    AdminProductsComponent,
    FormProductsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path:'admin/products', component: AdminProductsComponent},
      {path:'admin/products/create', component: FormProductsComponent},
      {path:'admin/products/:id', component: FormProductsComponent}
    ])
  ]
})
export class AdminModule { }
