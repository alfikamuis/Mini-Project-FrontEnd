import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ICart, IItems } from '../models/cart';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http: HttpClient) { }
  a:any;

  // 1 ---------------
  async addToCart(product: IProduct) {
    this.updateItem(product, 1);
  }

  // 2 ------------------------
  private async updateItem(product: IProduct, change: number) {
    await this.getOrCreateCartId();
    let cartId:any = localStorage.getItem('cartId');
    let ita$ = this.getItem(cartId, product.id);
    ita$.pipe(take(1)).subscribe(i => {
      localStorage.setItem('prod', String(i.price));
       console.log(i.productId);
    });


    // this.obj.pipe(take(1)).subscribe(data => {
    //   let quantity = ( || 0) + change;
    //   console.log(item.id)
      // if (quantity === 0) item$.
      // else item$.update({ 
      //   title: product.title,
      //   imageUrl: product.imageUrl,
      //   price: product.price,
      //   quantity: quantity
      // });
    // });

  }

  // 3 ----------------------- cart Id local storage
  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    return result.pipe(take(1)).subscribe(param => {
      localStorage.setItem('cartId', String(param.id));
    }).unsubscribe();
  }

  // 4 ------------------
  private create(){
    return this.http.post<ICart>(`${environment.apiUrl}/cart`, { createdAt: new Date().getTime() });
  }

  // 5-----------------
  private getItem(cartId: string, productId: number) {
    return this.http.get<IItems>(`${environment.apiUrl}/items?productId=${productId}&userId=${cartId}`)
    .pipe(map((data)=>data));
    // return this.http.get<any>(`${environment.apiUrl}/items?userId=2`);
  }




  // getCart(cartId: string): Observable<ICart> {
  //   return this.http.get<ICart>(`${environment.apiUrl}/shopping-cart/` + cartId);
  // }

  // update(cartId: any, productId: number, payload: IItems): Observable<IItems> {
  //   return this.http.put<IItems>(`${environment.apiUrl}/shopping-cart/` + cartId + '/items/' + productId + '/', payload);
  // }

  // delete(cartId: any, productId: number): Observable<IItems> {
  //   return this.http.delete<IItems>(`${environment.apiUrl}/shopping-cart/` + cartId + '/items/' + productId);
  // }

}
