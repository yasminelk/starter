import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsSubscription :BehaviorSubject<any[]> = new BehaviorSubject([]) ; 
  constructor(private _httpClient : HttpClient) {

   }
   getProducts(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${environment.url}/products`);
  }
   addProduct(product){
    return this._httpClient.post(`${environment.url}/products` , product)
  }


  deleteProduct(id){
        return this._httpClient.delete(`${environment.url}/products/${id}`)
      }
}
