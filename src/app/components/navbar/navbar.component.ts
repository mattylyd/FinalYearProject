import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import firebase from "firebase/compat";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  email:String = ""
  user:firebase.User

  constructor(private authService: AuthService, private router:Router, private hotToast:HotToastService) {

  }

  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
      if (user){

        this.user = user;
        this.email = user.email
      }
      else{

        this.user = null
      }
    })

  }
  onSubmit() {
    this.authService.logout().pipe(
      this.hotToast.observe({
        success: 'Logged out successfully',
        loading: 'Logging out',
        error: 'There was an error'

      })
    ).subscribe(() => {
      this.user = null;
      this.email = "";
      this.router.navigate([''])
    });


  }
}
