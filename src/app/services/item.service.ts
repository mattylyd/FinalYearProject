import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
// import {Item} from "../models/items";
import {Observable} from "rxjs";
import { Blockchain, Block } from '../../../../untitled1/src/block';
 import {blockTS} from "../models/blockTS";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsCollection: AngularFirestoreCollection<blockTS>;
  items:Observable<blockTS[]>;
  public blockchainInstance = new Blockchain();

  constructor(public afs: AngularFirestore) {
    this.items = this.afs.collection('blocks').valueChanges();
    this.items.subscribe(blocks=>{
      blocks.forEach(block=>{
        console.log(block.data);
      })
    });
  }
  getItems(){
    return this.items;
}
  getBlocks(){
    return this.blockchainInstance.chain;
  }
}

