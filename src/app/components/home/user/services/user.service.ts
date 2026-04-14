import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loggedInUser, LoginToken, User } from '../../types/user.type';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private isAuthenticated=signal<boolean>(false);
private loggedInUser=signal<loggedInUser>({}as loggedInUser);

private autoLogoutTimer:any;
private authToken!:string;

    get isUserAuthenticated():boolean{
      return this.isAuthenticated();
    }
    get isUserAuthenticated$():Observable<boolean>{
      return toObservable(this.isAuthenticated);
    }
    get loggedInUsers$():Observable<loggedInUser>{
      return toObservable(this.loggedInUser);
    }
  get token():string{
    return this.authToken;
  }
    loginUser(email:string,password:string):Observable<any>{
        const url :string='http://localhost:5001/users/login';
        return this.http.post(url, {email,password});
    }
  constructor(private http: HttpClient) {
    this.loadToken();
   }

   createUser(user: User): Observable<any> {
    const url = 'http://localhost:5001/users/signup';

    return this.http.post(url,user)
      };
   
   login(email:string,password:string):Observable<any>{
    const url='http://localhost:5001/users/login';
    return this.http.post(url,{email:email,password:password});
   }   

   activateToken(token:LoginToken,email:string):void{
    localStorage.setItem('token',token.token);
    localStorage.setItem('expiry', (new Date().getTime() + token.expiresInSeconds * 1000).toString());

    localStorage.setItem('firstname',token.user.firstname);
    localStorage.setItem('lastname',token.user.lastname);
    localStorage.setItem('address',token.user.address);
    localStorage.setItem('city',token.user.city);
    localStorage.setItem('state',token.user.state);
    localStorage.setItem('pin',token.user.pin);
    localStorage.setItem('email',email);

    this.isAuthenticated.set(true);
    this.loggedInUser.set(token.user);
    this.setAutoLogout(token.expiresInSeconds * 1000);
    this.authToken=token.token;
  }


  logout(): void {
    localStorage.clear();
    this.isAuthenticated.set(false);
    this.loggedInUser.set({} as loggedInUser);
    clearTimeout(this.autoLogoutTimer);
  }

  private setAutoLogout(expiryTime: number): void {
    
    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, expiryTime);
  }


  loadToken(): void {
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('expiry');
    if(!token || !expiry){
      return;
    }
    const expiryMs = Number(expiry);
    const remainingMs = expiryMs - Date.now();

    if(Number.isFinite(expiryMs) && remainingMs > 0){
      const user:loggedInUser={
        firstname: localStorage.getItem('firstname') || '',
        lastname: localStorage.getItem('lastname') || '',
        address: localStorage.getItem('address') || '',
        city: localStorage.getItem('city') || '',
        state: localStorage.getItem('state') || '',
        pin: localStorage.getItem('pin') || '',
        email: localStorage.getItem('email') || ''
      };
      this.isAuthenticated.set(true);
      this.loggedInUser.set(user);
      this.setAutoLogout(remainingMs);
      this.authToken=token;
      }
      else{
        this.logout();
      }
  }

}

