import { Component, OnInit } from '@angular/core';
import {BlockchainService} from "../../services/blockchain.service";
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //loginForm: User

  constructor(private authService: AuthService, private router:Router, private hotToast:HotToastService) {}

  loginForm: User = {
    username:'',
    password:''
  }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log("hello")
    console.log(JSON.stringify(this.loginForm));

    this.authService.login(this.loginForm.username, this.loginForm.password).pipe(
      this.hotToast.observe({
        success:'Logged in successfully',
        loading:'Logging in',
        error:'There was an error'

      })
    ).subscribe(() => {
      this.router.navigate(['/'])
    });
  }
}
