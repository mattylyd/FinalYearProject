import { Injectable } from '@angular/core';

//import { getStorage } from "@angular/fire/compat/storage";
import {getStorage} from "@angular/fire/storage";

import { AngularFireStorage } from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class fileService {


  constructor(public storage: AngularFireStorage) {







  }

}
