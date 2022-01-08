import { Component, OnInit } from '@angular/core';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {fileService} from "../../services/file.service";
///import {getStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    profileUrl: Observable<string | null>;
    newProfile: String;
    constructor(private fs: fileService) {

    this.profileUrl = this.fs.getFile("MattBlockTest.pdf");
    console.log(this.profileUrl)
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';

      this.profileUrl.subscribe(profile => {
        this.newProfile = profile
      });

  }

  ngOnInit(): void {
  }

}
