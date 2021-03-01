import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;
import { BehaviorSubject } from 'rxjs';
import {tap} from 'rxjs/operators' ;

interface UsernameAvailableResponse {
  available : boolean ;
}

interface SignUpCredentials{
    username : string ,
    password : string ,
    passwordConfirmation : string
}

interface SignUpResponse{
  username : string
}

interface SignedInResponse{
  authenticated : boolean ,
  username : string
}


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  rootUrl = 'https://api.angular-email.com' ;

  signedIn = new BehaviorSubject(false) ;

  constructor(private http  : HttpClient) {

  }

  usernameAvailable(username : string  ){
    return this.http.post<UsernameAvailableResponse>(
      this.rootUrl + '/auth/username' ,
      {username} ) ;
  } ;

  signup(credentials: SignUpCredentials ){
    return this.http.post<SignUpResponse>(
      this.rootUrl + '/auth/signup' ,
         credentials
    ).pipe(
      tap(()=>{
        this.signedIn.next(true) ;
      })
    )
  }


  checkAuth(){
    let url = this.rootUrl + '/auth/signedin' ;
    return this.http.get<SignedInResponse>(url).pipe(
      tap(({authenticated}) => {
        this.signedIn.next(authenticated)  ;
      })
    )
  }


  signout(){
      return this.http.post(`${this.rootUrl}/auth/signout` , {} ).pipe(
        tap( () =>{
          this.signedIn.next(false) ;
        })
      ) ;
  }

}
