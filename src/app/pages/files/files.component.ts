import { Component, OnInit } from '@angular/core';
import {fileService} from "../../services/file.service";
import {blockTS} from "../../models/blockTS";
import {userTS} from "../../models/userTS";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  public files:Array<string>
  public id: string;

  constructor(private fs:fileService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['user'];
      console.log(this.id); // Print the parameter to the console.
    });

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
    this.fs.getFiles()
  }

}
