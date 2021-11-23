import { Injectable } from '@angular/core';
import { Blockchain, Block } from '../../../../untitled1/src/block';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
// import {Item} from "../models/items";
import {Observable} from "rxjs";
import {blockTS} from "../models/blockTS";

// declare class Blockchain{};
@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  blockCollection: AngularFirestoreCollection<blockTS>;
  items:Observable<blockTS[]>;
  public blockchainInstance = new Blockchain();

  constructor(public afs: AngularFirestore) {
    this.items = this.afs.collection('blocks').valueChanges();
    this.items.subscribe(blocks=>{
      blocks.forEach(block=>{
        this.blockchainInstance.addNewBlock(new Block(block.index,block.timestamp, block.data ))
      })
    });

  }
  getBlocks(){
    return this.blockchainInstance.chain;
  }
  addNewBlock(index, timestamp, data, previousHash=''){
    return this.blockchainInstance.addNewBlock(new Block(index,timestamp,data,previousHash));
  }
}
