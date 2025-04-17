import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';


@Injectable({ providedIn: 'root' })
export class FactureService {
  constructor(private http: HttpClient) {}



  getFactures() {
    return this.http.get<any[]>(`${environment.url}/invoices`);
  }
  updateFacture(id: number, data: any){

  }


  downloadPDF(orderId: number) {
    return this.http.get(`${environment.url}/${orderId}/pdf`, {
      responseType: 'blob' // important pour manipuler un fichier binaire
    });
  }


  createFacture(product){
      return this.http.post(`${environment.url}/invoices` , product)
    }
  
  
    deletefacture(id){
          return this.http.delete(`${environment.url}/invoices/${id}`)
        }
}
