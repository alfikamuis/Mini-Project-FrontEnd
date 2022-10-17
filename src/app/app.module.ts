import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';
// import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
// import {
//   GoogleLoginProvider,
//   FacebookLoginProvider
// } from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AdminModule,
    SharedModule,
    ShoppingModule,
   // SocialLoginModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
    ]),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    // {
    //   provide: AuthServiceConfig,
    //   useFactory: provideConfig
    // },
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider(
    //           'clientId'
    //         )
    //       },
    //       {
    //         id: FacebookLoginProvider.PROVIDER_ID,
    //         provider: new FacebookLoginProvider('clientId')
    //       }
    //     ],
    //     onError: (err:any) => {
    //       console.error(err);
    //     }
    //   } as SocialAuthServiceConfig,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
