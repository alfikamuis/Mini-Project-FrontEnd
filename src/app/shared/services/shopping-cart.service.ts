import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, take } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ICart, ICartServer } from '../models/cart';
import { IProduct, IResponseProduct } from '../models/product';
import { OrderService } from './order.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private cartDataClient: ICart = {
    prodData: [{
      incart: 0,
      id: 0,
    }],
    total: 0,
  };

  private cartDataServer: ICartServer = {
    data: [{
      product: undefined,
      numInCart: 0
    }],
    total: 0
  };

  cartTotal$ = new BehaviorSubject<number>(0);
  cartData$ = new BehaviorSubject<ICartServer >(this.cartDataServer);

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
  ) {

    this.cartTotal$.next(this.cartDataServer.total);
    this.cartData$.next(this.cartDataServer);

    //check local storage

    // localStorage.setItem('cart','');


  }

  ngOnInit() {
    let info: ICart = JSON.parse(localStorage.getItem('cart') || '{}');

    if (info !== null && info !== undefined && info.prodData?.[0].incart !== 0) {
      this.cartDataClient = info;


      this.cartDataClient.prodData?.forEach(data => {
        this.productService.get(data.id).subscribe((actualInfo: any) => {
          if (this.cartDataServer.data[0].numInCart === 0) {
            this.cartDataServer.data[0].numInCart = data.incart;
            this.cartDataServer.data[0].product = actualInfo;
            this.calculateTotal();
            //calculateTotal
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          } else {
            this.cartDataServer.data.push({
              numInCart: data.incart,
              product: actualInfo
            });
            this.calculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }
          this.cartData$.next({ ...this.cartDataServer });
        });
      });
    }
  }

  CalculateSubTotal(index: number): Number {
    let subTotal = 0;

    let p = this.cartDataServer.data[index];
    // @ts-ignore
    subTotal = p.product.price * p.numInCart;

    return subTotal;
  }


  addProductToCart(id: number, quantity?: number) {
    this.productService.get(id).pipe(take(1)).subscribe(data => {
      if (this.cartDataServer.data[0].product === undefined) {
        this.cartDataServer.data[0].product = data;
        this.cartDataServer.data[0].numInCart = quantity !== undefined ? quantity : 1;
        this.calculateTotal();


        //calculateTotal
        this.cartDataClient.prodData[0].incart = this.cartDataServer.data[0].numInCart;
        this.cartDataClient.prodData[0].id = data.id;
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartData$.next({ ...this.cartDataServer });

      }
      //if the cart has some items
      else {
        let index = this.cartDataServer.data.findIndex(p => p.product?.id === data.id) //-1

        //item already in cart
        if (index !== -1) {
          if (quantity !== undefined && quantity <= data.quantity) {
            this.cartDataServer.data[index].numInCart =
              this.cartDataServer.data[index].numInCart < data.quantity ? quantity : data.quantity;
          } else {
            this.cartDataServer.data[index].numInCart =
              this.cartDataServer.data[index].numInCart < data.quantity ? this.cartDataServer.data[index].numInCart++ : data.quantity;
          }

          this.cartDataClient.prodData![0].incart = this.cartDataServer.data[index].numInCart;
          this.toast.info(`${data.name} quantity updated in the cart.`, "Product Updated", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          })
        }

        //item not in cart
        else {
          this.cartDataServer.data.push({
            numInCart: 1,
            product: data,
          });

          this.cartDataClient.prodData!.push({
            id: data.id,
            incart: 1,
          })
          this.toast.success(`${data.name} added to the cart.`, "Product Added", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          })

          //calculateTotal
          this.calculateTotal();
          this.cartDataClient.total = this.cartDataServer.total;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          this.cartData$.next({ ...this.cartDataServer });
        }
      }
    });
  }

  updateCartItems(index: number, increase: boolean) {
    let data = this.cartDataServer.data[index];

    if (increase) {
      data.numInCart < data.product!.quantity ? data.numInCart++ : data.product!.quantity;
      this.cartDataClient.prodData[index].incart = data.numInCart;
      this.cartDataClient.total = this.cartDataServer.total;
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      this.cartData$.next({ ...this.cartDataServer });
    } else {
      data.numInCart--;

      if (data.numInCart < 1) {
        //delete product
        this.cartData$.next({ ...this.cartDataServer });
      } else {
        this.cartData$.next({ ...this.cartDataServer });
        this.cartDataClient.prodData[index].incart = data.numInCart;

        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));

      }
    }
  }

  deleteProductFromCart(index: number) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      this.cartDataClient.total = this.cartDataServer.total;

      if (this.cartDataClient.total === 0) {
        this.cartDataClient = { prodData: [{ incart: 0, id: 0 }], total: 0 };
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));

      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

      if (this.cartDataServer.total === 0) {
        this.cartDataServer = {
          data: [{
            product: undefined,
            numInCart: 0
          }],
          total: 0
        };
        this.cartData$.next({ ...this.cartDataServer });
      } else {
        this.cartData$.next({ ...this.cartDataServer });
      }
    }
    else {
      //cancel button
      return;
    }
  }

  checkout(userId: number) {
    this.http.post(`${environment.apiUrl}/orders/payment`, null).subscribe((res: any) => { //res:(success:boolean)

      if (res.success) {
        this.resetServerData();
        this.http.post(`${environment.apiUrl}/orders/new`, {
          userId: userId,
          products: this.cartDataClient.prodData
        }).subscribe((data: any) => { //data: OrderResponse

          this.orderService.getOrder(data.order_id).then(prod => {
            if (data.success) {
              const navigationExtras: NavigationExtras = {
                state: {
                  message: data.message,
                  products: prod,
                  orderId: data.order_id,
                  total: this.cartDataClient.total
                }
              };

              this.spinner.hide().then();
              this.router.navigate(['/thankyou'], navigationExtras).then(p => {
                this.cartDataClient = { prodData: [{ incart: 0, id: 0 }], total: 0 };
                this.cartTotal$.next(0);
                localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
              });

            }
          })

        })
      } else {
        this.spinner.hide().then();
        this.router.navigateByUrl('/checkout').then();
        this.toast.error(`Sorry, failed to book the order`, "Order Status", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        })
      }
    });
  }

  private calculateTotal() {
    let total = 0;
    this.cartDataServer.data.forEach(data => {
      const { numInCart } = data;
      const { price }: any = data.product!;

      total += numInCart * price;
    });
    this.cartDataServer.total = total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  private resetServerData() {
    this.cartDataServer = {
      data: [{
        product: undefined,
        numInCart: 0
      }],
      total: 0
    };
    this.cartData$.next({ ...this.cartDataServer });
  }
}

interface OrderResponse {
  order_id: number,
  success: boolean,
  message: string,
  products: [{
    id: string,
    numIncart: string
  }]
}
