import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class factureeService {
  facturesSubscription :BehaviorSubject<any[]> = new BehaviorSubject([]) ; 
  constructor(private _httpClient : HttpClient) {

   }
   getfactures(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${environment.url}/factures`);
  }
   addfacture(facture){
    return this._httpClient.post(`${environment.url}/factures` , facture)
  }


  deletefacture(id){
        return this._httpClient.delete(`${environment.url}/factures/${id}`)
      }
}
