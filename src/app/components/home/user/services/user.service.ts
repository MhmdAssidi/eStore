import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginToken, User } from '../../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

   }

   createUser(user: User): Observable<any> {
    const url = 'http://localhost:5001/users/signup';

    return this.http.post(url,user)
      };
   
   login(email:string,password:string):Observable<any>{
    const url='http://localhost:5001/users/login';
    return this.http.post(url,{email:email,password:password});
   }   

   activateToken(token:LoginToken):void{
    localStorage.setItem('token',token.token);
    localStorage.setItem('expiry',new Date().getTime()+(token.expiresInSeconds*1000).toString());
   }
}
