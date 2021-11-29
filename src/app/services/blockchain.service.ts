import { Injectable } from '@angular/core';
import { Blockchain, Block } from '../../../../untitled1/src/block';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
// import {Item} from "../models/items";
import {Observable} from "rxjs";
import {blockTS} from "../models/blockTS";
import 'rxjs/add/operator/map';
import {JsonArray} from "@angular/compiler-cli/ngcc/src/packages/entry_point";

// declare class Blockchain{};
@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  blockCollection: AngularFirestoreCollection<blockTS>;
  public blocksO:Observable<blockTS[]>;
  public blockchainInstance = new Blockchain();

  constructor(public afs: AngularFirestore) {
    this.blockCollection = this.afs.collection('blocks')
    this.blocksO = this.blockCollection.snapshotChanges().map(changes => {
      return changes.map( a=> {
        const data = a.payload.doc.data() as blockTS
        data.id = a.payload.doc.id;
        return data
      })
    });






  }
  getBlocks(){
    return this.blocksO
  }
  addNewBlock(index, timestamp, data, previousHash=''){
    return this.blockchainInstance.addNewBlock(new Block(index,timestamp,data,previousHash));
  }
  addNewBlock2(block: blockTS){
    return this.blockCollection.add(block);
  }
}
