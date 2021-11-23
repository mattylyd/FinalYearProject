import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../services/item.service";
import {Item} from "../../models/items";
import {blockTS} from "../../models/blockTS";
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  blocks: blockTS[];
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    // console.log("hello");
    this.itemService.getItems().subscribe(blocks => {
      this.blocks = blocks;
    });

  }

}
