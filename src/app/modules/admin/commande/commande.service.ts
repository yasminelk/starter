import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class commandeeService {
  commandesSubscription :BehaviorSubject<any[]> = new BehaviorSubject([]) ; 
  constructor(private _httpClient : HttpClient) {

   }
   getcommandes(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${environment.url}/commandes`);
  }
   addcommande(commande){
    return this._httpClient.post(`${environment.url}/commandes` , commande)
  }


  deletecommande(id){
        return this._httpClient.delete(`${environment.url}/commandes/${id}`)
      }
}
