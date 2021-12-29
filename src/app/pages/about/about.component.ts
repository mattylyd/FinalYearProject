import { Component, OnInit } from '@angular/core';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
///import {getStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    profileUrl: Observable<string | null>;
    newProfile: String;
    constructor(private storage: AngularFireStorage) {
    const ref = this.storage.ref('MattBlockTest.pdf');
    this.profileUrl = ref.getDownloadURL();
    console.log(this.profileUrl)
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';

      this.profileUrl.subscribe(profile => {
        this.newProfile = profile
      });

  }

  ngOnInit(): void {
  }

}
