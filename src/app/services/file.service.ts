import { Injectable } from '@angular/core';

//import { getStorage } from "@angular/fire/compat/storage";
import {getStorage} from "@angular/fire/storage";

import { AngularFireStorage } from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {pdfDefaultOptions} from "ngx-extended-pdf-viewer";
import {userTS} from "../models/userTS";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";


@Injectable({
  providedIn: 'root'
})
export class fileService {

  profileUrl: Observable<string | null>;
  ref:any
  set:Boolean
  newProfile: String;

  fileCollection: AngularFirestoreCollection<userTS>;
  public filesO:Observable<userTS[]>;
  files:Array<String>;
  constructor(private storage: AngularFireStorage, public afs: AngularFirestore) {
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
    this.set = false;





  }

  getFile(file:string): Observable<string> {

    this.profileUrl = this.storage.ref(file).getDownloadURL()

    this.set = true




    return this.profileUrl
  }


  async test(file: string): Promise<any> {
    return await this.storage.ref(file).getDownloadURL().toPromise()
      .then(doc => {
        if (doc.exists) { // if document exists ...
          console.log("Exists")
        } else { // if document does not exist ...
          console.log("No such Doc")
          //throw new Error('No such document!'); // ... throw an Error.
        }
      })
      .catch(error => {
        console.log("Error Doc")
        //throw new Error('Error: Getting document:'); // throw an Error
      });
  };


  getFiles(){
    this.fileCollection = this.afs.collection('users')
    this.filesO = this.fileCollection.snapshotChanges().map(changes => {
      return changes.map( a=> {
        const data = a.payload.doc.data() as userTS
        return data
      })
    });
    return this.filesO
  }

  ngOnInit(): void {
  }








}
