import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {BlockchainService} from "../../services/blockchain.service";
@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  styleUrls: ['./block-view.component.css']
})
export class BlockViewComponent implements OnInit {
  public blocks  = [] as any;

  constructor( private blockchainService: BlockchainService) {
    this.blocks = blockchainService.getBlocks();
  }
  addNewBlock(form){


    const formParsed = JSON.parse(JSON.stringify(form.value));

    this.blockchainService.addNewBlock(formParsed.ID, formParsed.Date, formParsed.Data);
    return;

  }
  ngOnInit(): void {
  }

}
