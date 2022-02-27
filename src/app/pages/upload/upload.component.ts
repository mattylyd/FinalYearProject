import { Component, OnInit } from '@angular/core';
import {fileService} from "../../services/file.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {HotToastService} from "@ngneat/hot-toast";
import {finalize} from "rxjs/operators";
import {BlockchainService} from "../../services/blockchain.service";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable, of, throwError} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import firebase from "firebase/compat/app";
import {AuthService} from "../../services/auth.service";
// import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  public userList: Observable<String[]>;
  public fnf: boolean;

  myForm;


  constructor(public afs: AngularFirestore, private fs : fileService, private storage : AngularFireStorage, private hotToast:HotToastService, private bs : BlockchainService, private as : AuthService) {
    this.fnf = true;
    this.myForm = new FormGroup({
      file: new FormControl(''),
      users: new FormControl(''),
    });



  }

  ngOnInit(): void {



    this.afs.collection("users").snapshotChanges().map(actions => {
      return actions.map(a => {
        // const data = a.payload.doc.data() as Shirt;
        const id = a.payload.doc.id;
        return { id };
      });
    }).subscribe( emails=> {
      let tempList = []
      for (let i = 0; i < emails.length; i++){
        tempList.push((emails[i].id).toString())

      }
      this.userList = of(tempList)

      }

    )


      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };

  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onSubmit(selectedUsers){


    this.fnf=true;

    //IMPROVE HOT TOAST HERE

    this.as.authState.pipe(
      this.hotToast.observe({
        success:'File list loaded successfully',
        loading:'Loading file list',
        error:'There was an error',

      })).subscribe(user=> {



      let fileUpload = (<HTMLInputElement>document.getElementById('formFile')).files[0];
      console.log(fileUpload.name)
      this.fs.fileExists(fileUpload.name).subscribe(test =>{
        console.log(test)
        if (test != "FNF"){
          this.fnf = false;
          this.hotToast.close()
          throwError('hello');
          this.hotToast.error('File already exists!')
          console.log("waa")

          return
        }

        console.log("UPLOADING");
        let storageRef = this.storage.ref(fileUpload.name);
        console.log(fileUpload.name);


        console.log(selectedUsers)


        let uploadTask = storageRef.put(fileUpload)


        uploadTask.snapshotChanges().pipe(
          // this.hotToast.observe({
          //   success: 'File uploaded successfully',
          //   loading: 'File uploading',
          //   error: 'There was an error'
          //
          // }),
          finalize(() => {
            storageRef.getDownloadURL().subscribe()

          }),
        ).subscribe()


        this.bs.createBlock(fileUpload.name.substring(0, fileUpload.name.length - 4), "create", user.email)

        for (let i = 0; i < selectedUsers.length; i++) {
          var usersRef = this.afs.collection("users").doc(selectedUsers[i]);
          usersRef.update({
            files: firebase.firestore.FieldValue.arrayUnion(fileUpload.name)
          });

        }

        this.afs.collection("files").doc(fileUpload.name.substring(0, fileUpload.name.length - 4)).set({
          creator: user.email,
          type: "pdf",
          users: selectedUsers
        });
        return;
      });

    })
    console.log("end")
    console.log(this.fnf)

  }
}
