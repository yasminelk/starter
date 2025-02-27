import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _httpClient :HttpClient) {
   }

    getUsers(){
      return this._httpClient.get('https://jsonplaceholder.typicode.com/users');
    }
    addUser(user){
      return this._httpClient.post(`${environment.url}/auth/register/user` , user).subscribe(res => {
        console.log(res);
        
      })
    }

}
