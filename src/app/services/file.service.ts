import { Injectable } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {pdfDefaultOptions} from "ngx-extended-pdf-viewer";
import {userTS} from "../models/userTS";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {fileDataTS} from "../models/fileDataTS";


@Injectable({
  providedIn: 'root'
})
export class fileService {

  profileUrl: Observable<string | null>;
  set:Boolean
  fileCollection: AngularFirestoreCollection<userTS>;
  public filesO:Observable<userTS[]>;
  files:Array<String>;


  fileData:Observable<fileDataTS[]>


  constructor(private storage: AngularFireStorage, public afs: AngularFirestore) {
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
    this.set = false;







  }

  getFileData(file:string) {
     return this.afs.collection('files').doc(file.substring(0, file.length-4)).valueChanges()
    // return this.afs.collection('files').get();

  }



  getFile(file:string): Observable<string> {


    this.profileUrl = this.storage.ref(file).getDownloadURL()

    this.set = true




    return this.profileUrl
  }





  getFileList(user:string){

    return this.afs.collection('users').doc(user).valueChanges()
    //this.fileCollection = this.afs.collection('users')
    // this.filesO = this.fileCollection.snapshotChanges().map(changes => {
    //   return changes.map( a=> {
    //     const data = a.payload.doc.data() as userTS
    //     return data
    //   })
    // });
    // return this.filesO
  }

  addAction(action:string, file:string){

    console.log(file)
    this.afs.collection("blocks").doc(file).update({test: { action: action}});


  }

  ngOnInit(): void {
  }








}
