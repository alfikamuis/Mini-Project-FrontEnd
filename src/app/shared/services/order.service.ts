import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import { environment } from 'src/environments/environment.prod';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  products: ProductResponseModel[] = [];
  constructor(
    private http: HttpClient

  ) { }

 getOrder(orderId:number){
    return lastValueFrom(this.http.get<ProductResponseModel[]>(`${environment.apiUrl}/orders/${orderId}`)); //.toPromise()
  }
}

interface ProductResponseModel {
  id: number;
  title: string;
  description: string;
  price: number;
  quantityOrdered: number;
  image: string;
}