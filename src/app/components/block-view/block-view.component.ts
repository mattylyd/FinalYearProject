import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {BlockchainService} from "../../services/blockchain.service";
import {blockTS} from "../../models/blockTS";
@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  styleUrls: ['./block-view.component.css']
})
export class BlockViewComponent implements OnInit {
  public blocks:Array<blockTS>

  constructor( private blockchainService: BlockchainService) {


  }
  addNewBlock(form){    // blockchainService.getBlocks().subscribe(blocks=>{
    //   this.blocks = blocks;
    //
    // });


    const formParsed = JSON.parse(JSON.stringify(form.value));

    this.blockchainService.addNewBlock(formParsed.ID, formParsed.Date, formParsed.Data);
    return;

  }
  ngOnInit(): void {
  }

}
