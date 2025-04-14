import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsSubscription :BehaviorSubject<any[]> = new BehaviorSubject([]) ; 
  constructor(private _httpClient : HttpClient) {

   }
   getProducts() { 
    return this._httpClient.get(`${environment.url}/products`).subscribe(res => {
      this.productsSubscription.next(res as any[]);
    });
   }
   addProduct(product){
    return this._httpClient.post(`${environment.url}/products` , product)
  }
}
