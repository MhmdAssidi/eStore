import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../types/user.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    createUser(user:User):Observable<any>{
         const url :string='http://localhost:5001/users/signup';
      return this.http.post(url, {
        firstname: user.firstname,
        lastname: user.lastname,
        address: user.address,
        city: user.city,
        state: user.state,
        pin: user.pin,
        email: user.email,
        password: user.password
      });
    } 

    loginUser(email:string,password:string):Observable<any>{
        const url :string='http://localhost:5001/users/login';
        return this.http.post(url, {email,password});
    }
}