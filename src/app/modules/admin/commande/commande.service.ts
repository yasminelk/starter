import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class commandeeService {
  createOrder(commande: any) {
    return this._httpClient.post(`${environment.url}/orders` , commande)  }
  commandesSubscription :BehaviorSubject<any[]> = new BehaviorSubject([]) ; 
  constructor(private _httpClient : HttpClient) {

   }
   getcommandes(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${environment.url}/orders`);
  }
   addcommande(commande){
    return this._httpClient.post(`${environment.url}/orders` , commande)
  }


  deletecommande(id){
        return this._httpClient.delete(`${environment.url}/orders/${id}`)
      }
}
