import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {fileService} from "../../services/file.service";
import {pdfDefaultOptions} from "ngx-extended-pdf-viewer";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  fileURL: string;
  errorCode: string;
  urlFile: String;
  set:Promise<Boolean>
  test:string


  constructor(private fs: fileService, private router: Router, private hotToast:HotToastService) {

    this.fileURL = ""
    this.errorCode= ""


    let urlFile = router.url.split("/")[2]





    this.fs.getFile(urlFile).pipe(
      this.hotToast.observe({
        success:'Loaded file successfully',
        loading:'Loading file',
        error:'There was an error'

      }))
      .subscribe(
        data => this.fileURL=data,
         err => this.errorCode = err,
      );


  }

  ngOnInit(): void {
  }

}
