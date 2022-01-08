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
  newProfile: String;

  fileCollection: AngularFirestoreCollection<userTS>;
  public filesO:Observable<userTS[]>;
  files:Array<String>;
  constructor(private storage: AngularFireStorage, public afs: AngularFirestore) {
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';





  }

  getFile(file:string): Observable<string> {
    const ref = this.storage.ref(file);
    this.profileUrl = ref.getDownloadURL();
    return this.profileUrl
  }
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
