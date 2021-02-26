import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service' ;
import {BehaviorSubject} from 'rxjs';

// https://api.angular-email.com/auth/signedin
/*
  {
      "username" : "tahmid12" ,
      "password" : "1234" ,
      "passwordConfirmation" : "1234"
  }
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  signedIn : BehaviorSubject<boolean>


  constructor(private authService : AuthService ){
        this.signedIn = authService.signedIn ;
  }

  ngOnInit(){
    this.authService.checkAuth().subscribe(()=>{}) ;
  }



}
