import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import {from, Observable} from "rxjs";
import firebase from "firebase/compat";
import { first } from 'rxjs/operators';
import {AngularFirestore} from "@angular/fire/compat/firestore";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: Observable<firebase.User>
  private currentUser: firebase.User;

  constructor(public auth: AngularFireAuth, public afs:AngularFirestore) {
  this.authState = auth.authState

  }


  login(username: string, password: string){
    return from(this.auth.signInWithEmailAndPassword(username, password));
  }
  logout(){
    return from(this.auth.signOut())
  }

   getUser() {
     return sessionStorage.getItem('user') || undefined;
    // return this.auth.user
     // return this.auth.authState.pipe(first()).toPromise();

  }

  update(){
    console.log("Update", this.currentUser)
  }
   getEmail(){
    this.getUser()
    console.log("Mega Cehcl", this.currentUser.email)
    return "ll"
  }

  register(email: string, password: string) {
    return from(this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        // this.SendVerificationMail();
        // this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      }))
  }
  addUser(email: string){
    this.afs.collection("users").doc(email).set({ files: [""]})
      .catch((error) => {
        window.alert(error.message);
      })
  }

  checkUserExists(email: string){
     return (this.auth.fetchSignInMethodsForEmail(email)
      .then(function(signInMethods) {
        if (signInMethods.length > 0) {
        return true;
        }
        else{
          return false;
        }
      }))
  }


}
