import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  create(payload:IProduct) : Observable<IProduct>{
    return this.http.post<IProduct>(`${environment.apiUrl}/products/create`,payload);
  }

  getAll(resultNumber:number) : Observable<IProduct[]>{
    return this.http.get<IProduct[]>(`${environment.apiUrl}/products`,{
      params:{
        limit: resultNumber.toString()
      }
    });
  }

  get(productId : number) : Observable<IProduct> { 
    return this.http.get<IProduct>(`${environment.apiUrl}/products/`+ productId);
  }

  update(productId:number,payload:IProduct) : Observable<IProduct>{
    return this.http.patch<IProduct>(`${environment.apiUrl}/products/`+ productId, payload);
  }

  delete(productId : number) : Observable<IProduct> { 
    return this.http.delete<IProduct>(`${environment.apiUrl}/products/`+ productId);
  }
}
