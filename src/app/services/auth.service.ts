import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import {from, Observable} from "rxjs";
import firebase from "firebase/compat";
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: Observable<firebase.User>
  private currentUser: firebase.User;

  constructor(public auth: AngularFireAuth) {
  this.authState = auth.authState

  }

  success() {
    return "Successfull";
  }

  login(username: string, password: string){
    return from(this.auth.signInWithEmailAndPassword(username, password));
  }
  logout(){
    return from(this.auth.signOut())
  }

   getUser() {
     return this.auth.authState.pipe(first()).toPromise();
    // this.authState = this.auth.authState;
    //   this.authState.subscribe(user => {
    //   if (user) {
    //     this.currentUser = user;
    //     console.log('AUTHSTATE USER', user)
    //     //console.log(user.email)
    //   } else {
    //     console.log('AUTHSTATE USER EMPTY', user)
    //     this.currentUser = null;
    //   }
    //
    // })

     return this.currentUser;
  }

  update(){
    console.log("Update", this.currentUser)
  }
   getEmail(){
    this.getUser()
    console.log("Mega Cehcl", this.currentUser.email)
    return "ll"
  }

  // get isAuthenticated(): boolean {
  //   return this.auth.currentUser !== null;
  // }
  //
  //
  // get isEmailVerified(): boolean {
  //   return this.isAuthenticated ? this.authState.emailVerified : false;
  // }
  //
  //
  // get currentUserId(): string {
  //   return this.isAuthenticated ? this.authState.uid : null;
  // }


  // get userData(): any {
  //   if ( ! this.isAuthenticated ) {
  //     return [];
  //   }
  //
  //   return [
  //     {
  //       id: this.authState.uid,
  //       displayName: this.authState.displayName,
  //       email: this.authState.email,
  //       phoneNumber: this.authState.phoneNumber,
  //       photoURL: this.authState.photoURL,
  //     }
  //   ];
  // }

}
