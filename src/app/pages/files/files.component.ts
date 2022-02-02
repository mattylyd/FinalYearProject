import { Component, OnInit } from '@angular/core';
import {fileService} from "../../services/file.service";
import {blockTS} from "../../models/blockTS";
import {userTS} from "../../models/userTS";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import * as http from "http";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  public files:Array<string>
  public file:string
  public id: string;

  constructor(private authS:AuthService, private fs:fileService, private route: ActivatedRoute) {
   authS.authState.subscribe(user=>{
      this.id = user.email
    })

    console.log(this.id)
    fs.getFiles().subscribe(users=>{
      for(const user of users){

        if (user.email == this.id){
          this.files = user.files;
        }


      }


    });

  }

  ngOnInit(): void {
    // this.fs.getFiles()
  }
  //
  // getFile(targetFile){
  //   this.fs.getFile(targetFile).subscribe(file=>{
  //     this.file = file;
  //   })
  //   console.log(this.file)
  // }



}
