import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BlockchainService} from "../../services/blockchain.service";
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
import {Observable} from "rxjs";
import firebase from "firebase/compat";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //loginForm: User
  email:String
  user:firebase.User

  constructor(private authService: AuthService, private router:Router, private hotToast:HotToastService, private cdr:ChangeDetectorRef) {

  }

  loginForm: User = {
    username:'',
    password:''
  }

   async ngOnInit()  {


     // const user = await this.authService.getUser();
     // let name = user.email
     // console.log("hello", typeof(user.email))
     // this.cdr.detectChanges();

     this.authService.authState.subscribe(user => {
       if (user){
         console.log("yes")
         this.user = user;
         this.email = user.email
       }
       else{
         console.log("no")
         this.user = null
       }
       })

   }


  onSubmit(){

    this.authService.login(this.loginForm.username, this.loginForm.password).pipe(
      this.hotToast.observe({
        success:'Logged in successfully',
        loading:'Logging in',
        error:'There was an error'

      })
    ).subscribe(() => {
      this.router.navigate([''])
    });

  }
}
