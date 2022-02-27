import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
import {User} from "../../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router, private hotToast:HotToastService) { }

  registerForm: User = {
    username:'',
    password:'',
    confirmpass:''
  }
  ngOnInit(): void {
  }

  async onSubmit(){

    console.log("begin")

    let userExists = await this.authService.checkUserExists(this.registerForm.username);

    if(userExists){
      this.hotToast.error("User already exists")
      return;
    }

    if(this.registerForm.password.length<6){
      this.hotToast.error("Password requires at least six characters")
      return;
    }
    if(this.registerForm.password !== this.registerForm.confirmpass){
      this.hotToast.error("Passwords do not match")
      return;
    }

    this.authService.register(this.registerForm.username, this.registerForm.password).pipe(
      this.hotToast.observe({
        success:'Registered successfully',
        loading:'Registering',
        error:'There was an error'

      })
    ).subscribe(() => {
      this.authService.addUser(this.registerForm.username)
      this.router.navigate(['/login'])
    });

  }

}
