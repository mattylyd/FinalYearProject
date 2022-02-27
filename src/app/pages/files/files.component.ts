import { Component, OnInit } from '@angular/core';
import {fileService} from "../../services/file.service";

import {ActivatedRoute} from "@angular/router";

import {AuthService} from "../../services/auth.service";
import {fileDataTS} from "../../models/fileDataTS";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  public userFiles:Array<string>
  public fileData:fileDataTS[]
  public file:string
  public id: string;

  constructor(private authS:AuthService, private fs:fileService, private route: ActivatedRoute, private hotToast:HotToastService) {
    this.fileData = []
   authS.authState.pipe(
     this.hotToast.observe({
       success:'File list loaded successfully',
       loading:'Loading file list',
       error:'There was an error'

     })).subscribe(user=>{

      this.id = user.email


      fs.getFileList(this.id).subscribe(fileList=>{



        console.log(JSON.stringify(fileList['files'].length));
        for (let i = 0; i<fileList['files'].length; i++) {
          let file = fileList['files'][i]
          console.log(i)
          console.log(JSON.stringify(file.substring(0, file.length-4)))
          if (file != ""){
            fs.getFileData(file).subscribe(fileData => {
              console.log(JSON.stringify(fileData))
              if (fileData) {
                console.log("t")
                let newFile: fileDataTS = {
                  name: file.substring(0, file.length - 4),
                  creator: fileData['creator'],
                  type: fileData['type'],
                  users: fileData['users'],
                }
                console.log(newFile)
                this.fileData.push(newFile)
              }

            })
          }
        }
      });
   })

  }

  ngOnInit(): void {

  }



}
