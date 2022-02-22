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


  constructor(private fs: fileService, private router: Router, private hotToast:HotToastService, private bc:BlockchainService) {


    // this.fs.addAction("view", urlFile.substring(0, urlFile.length-4));



  }

  ngOnInit(): void {


    this.fileURL = ""
    this.errorCode= ""


    this.urlFile = this.router.url.split("/")[2]


    this.fs.getFile(this.urlFile).pipe(
      this.hotToast.observe({
        success:'File loaded successfully',
        loading:'Loading file',
        error:'There was an error'

      }))
      .subscribe(
        data => this.fileURL=data,
        err => this.errorCode = err,
      );

    console.log(this.urlFile)

    this.bc.addNewBlock(this.urlFile.substring(0, this.urlFile.length-4), "view", "Matt")

    this.bc.getBlocks(this.urlFile.substring(0, this.urlFile.length-4)).pipe(first()).subscribe(blockList=>{

      this.blocks = [];

      console.log("hello!!!!")
      console.log(JSON.stringify(blockList[0].num));
      console.log(JSON.stringify(blockList[4].num));


      for (let i = 0; i < blockList.length; i++) {
        console.log(blockList[i].hash);
        let newBlock: blockTS = {
          num : blockList[i].num,
          date : blockList[i].date,
          action : blockList[i].action,
          user : blockList[i].user,
          hash : blockList[i].hash,
          prevhash : blockList[i].prevhash,

        }
        console.log(newBlock)
        this.blocks.push(newBlock)
      }

      // for (const block in blockList ){
      //   console.log((block.hash));
      // }


      // for (const file of fileList['files']) {
      //   console.log(JSON.stringify(file.substring(0, file.length-4)))
      //
      // }
    });




  }


}
