import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';


@Injectable({ providedIn: 'root' })
export class FactureService {
  constructor(private http: HttpClient) {}



  getFactures() {
    return this.http.get<any[]>(`${environment.url}/factures`);
  }
  updateFacture(id: number, data: any){

  }


 


  createFacture(product){
      return this.http.post(`${environment.url}/invoices` , product)
    }
  
  
    deletefacture(id){
          return this.http.delete(`${environment.url}/products/${id}`)
        }
}
