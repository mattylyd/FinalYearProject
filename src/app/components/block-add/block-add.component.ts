import { Component, OnInit } from '@angular/core';
import {BlockchainService} from "../../services/blockchain.service";
import {blockTS} from "../../models/blockTS";

@Component({
  selector: 'app-block-add',
  templateUrl: './block-add.component.html',
  styleUrls: ['./block-add.component.css']
})
export class BlockAddComponent implements OnInit {

  constructor(private blockchainService: BlockchainService) { }
  block: blockTS = {
    data: '',
    index: '',
    timestamp: ''
  }
  ngOnInit(): void {

  }
  onSubmit(){
    if (this.block.data!= ''&& this.block.index!='' && this.block.timestamp!=''){
      this.blockchainService.addNewBlock2(this.block);
      this.block.data='';
      this.block.index='';
      this.block.timestamp='';
    }
  }

}
