import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userSubscription :BehaviorSubject<any[]> = new BehaviorSubject([]) ; 
  constructor(private _httpClient :HttpClient) {
   }

    getUsers(){
      return this._httpClient.get(`${environment.url}/users`).pipe(tap(res => {
        this.userSubscription.next(res as any[]);
      }));
    }
    addUser(user){
      return this._httpClient.post(`${environment.url}/auth/register/user` , user).subscribe(res => {
      })
    }
    deleteUser(id){
      return this._httpClient.delete(`${environment.url}/users/${id}`)
    }

}
