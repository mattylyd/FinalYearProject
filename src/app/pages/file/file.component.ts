import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {fileService} from "../../services/file.service";
import {pdfDefaultOptions} from "ngx-extended-pdf-viewer";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
import {BlockchainService} from "../../services/blockchain.service";
import {blockTS} from "../../models/blockTS";
import {fileDataTS} from "../../models/fileDataTS";
import {first} from "rxjs/operators";
import {log} from "util";
import {AuthService} from "../../services/auth.service";
import * as fs from "fs";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  fileURL: string;
  errorCode: string;
  urlFile: string;
  set:Promise<Boolean>
  test:string
  public blocks: blockTS[]


  constructor(private  as: AuthService, private fs: fileService, private router: Router, private hotToast:HotToastService, private bc:BlockchainService) {


    // this.fs.addAction("view", urlFile.substring(0, urlFile.length-4));



  }

  ngOnInit(): void {


    this.fileURL = ""
    this.errorCode= ""


    this.urlFile = this.router.url.split("/")[2]





    //May have issues, changed tsconfig to es2021
    this.urlFile = this.urlFile.replaceAll("%20", " ")


    this.as.authState.pipe(this.hotToast.observe({
        success:'File loaded successfully',
        loading:'Loading file',
        error:'There was an error'

      })).subscribe(user=>{


        this.fs.getFile(this.urlFile)
          .subscribe(
            data => this.fileURL=data,
            err => this.errorCode = err,
          );

        console.log(this.urlFile)

        this.bc.addNewBlock(this.urlFile.substring(0, this.urlFile.length-4), "view", user.email)

        this.bc.getBlocks(this.urlFile.substring(0, this.urlFile.length-4)).pipe(first()).subscribe(blockList=>{
          this.blocks = [];
          for (let i = 0; i < blockList.length; i++) {
            let newBlock: blockTS = {
              num : blockList[i].num,
              date : blockList[i].date,
              action : blockList[i].action,
              user : blockList[i].user,
              hash : blockList[i].hash,
              prevhash : blockList[i].prevhash,

            }

            this.blocks.push(newBlock)
          }
      });
    })




  }


}
