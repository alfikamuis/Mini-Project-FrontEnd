import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CategoryService } from './services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDisplayComponent } from './components/product-display/product-display.component';
import { TableProductService } from './services/table-product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { DescriptionPipe } from './pipes/description.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { OrderService } from './services/order.service';

@NgModule({
  declarations: [
    ProductDisplayComponent,
    DescriptionPipe
  ],
  imports: [
    CommonModule,
    NgbModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    BrowserAnimationsModule,
    FormsModule,
    AccordionModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    NgbModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    BrowserAnimationsModule,
    FormsModule,
    AccordionModule,
    HttpClientModule,
    ReactiveFormsModule,
    DescriptionPipe,
    NgxSpinnerModule,
    ToastrModule,
    //components
    ProductDisplayComponent
  ],
  providers: [CategoryService,ProductService,TableProductService,ShoppingCartService,ToastrService,OrderService]
})
export class SharedModule { }
