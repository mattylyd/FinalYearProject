import { Injectable } from '@angular/core';
import { Blockchain, Block } from '../../../../untitled1/src/block';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
// import {Item} from "../models/items";
import {Observable, Subscription} from "rxjs";
import {blockTS} from "../models/blockTS";
import 'rxjs/add/operator/map';
import {JsonArray} from "@angular/compiler-cli/ngcc/src/packages/entry_point";
import firebase from "firebase/compat/app"
import {first} from "rxjs/operators";

const SHA256 = require('crypto-js/sha256')

// declare class Blockchain{};
@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  // blockCollection: AngularFirestoreCollection<blockTS>;
   public blocksO:Observable<blockTS[]>;
   public blockList:Observable<blockTS[]>;
   public blocks0sub:Subscription
  // public blockchainInstance = new Blockchain();

  public lastblock

  constructor(public afs: AngularFirestore) {
    // this.blockCollection = this.afs.collection('blocks')
    // this.blocksO = this.blockCollection.snapshotChanges().map(changes => {
    //   return changes.map( a=> {
    //     const data = a.payload.doc.data() as blockTS
    //     data.id = a.payload.doc.id;
    //     return data
    //   })
    // });






  }
  getBlocks(file){
    this.blockList = this.afs.collection("files").doc(file).collection("blocks", ref => ref.orderBy('date', 'desc')).valueChanges(blocks=>{
      return blocks.map(a => {
        const data = a.payload.doc.data() as blockTS;
        return data
      });
    });

    return this.blockList;




  }
  //index, timestamp, data, previousHash=''
  async addNewBlock(file, action, user) {

    this.blocksO = await this.afs.collection("files").doc(file).collection("blocks", ref => ref.orderBy('date', 'desc').limit(1)).valueChanges(block=>{
        return block.map(a => {
          const data = a.payload.doc.data() as blockTS;
          return data
        });
    });

    this.blocks0sub = this.blocksO.pipe(first()).subscribe(lblist => {
      // console.log("last!!!!")


      let lbdata = lblist[0]

      // console.log(JSON.stringify(lbdata))


      let recalHash = SHA256(lbdata.num.toString() + lbdata.date.toString()   + lbdata.action.toString()  + lbdata.user.toString()  + lbdata.prevhash.toString()).toString()




      console.log("recalPrevHash: " + recalHash)

      let date = new Date()

      let newHash = SHA256((parseInt(lbdata.num.toString()) + 1).toString() + date.toString() + action.toString() + user.toString() + lbdata.hash.toString()).toString()

      console.log("newHash: " + newHash)



      this.afs.collection("files").doc(file).collection("blocks").doc().set({ num: (parseInt(lbdata.num.toString()) + 1).toString(), date: date.toString(), action: action.toString(), user: user.toString(), prevhash: lbdata.hash.toString(), hash: newHash });



    })


  }
  createBlock(file, action, user){
    let date = new Date()
    let newHash = SHA256("0" + date.toString() + action.toString() + user.toString() + "").toString()
    this.afs.collection("files").doc(file).collection("blocks").doc().set({ num: "0", date: date.toString(), action: action.toString(), user: user.toString(), prevhash: "", hash: newHash });

  }


  addNewBlock2(newblock){
     return null;
  }
}
