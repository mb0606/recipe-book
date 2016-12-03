import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../shared/ingredient";
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'rb-shopping-list',
  template: `
  <div class="row">
    <div class="col-xs-10">
    <rb-shopping-list-add 
          [item]="selectedItem"
          (cleared)="onCleared()"></rb-shopping-list-add>
      <hr>
      <ul class="list-group">
        <a class="list-group-item"
           *ngFor="let item of items"
           (click)="onSelectItem(item)">
           {{item.name}} | {{item.amount}}
           </a>
      </ul>
    </div>
  </div>

  `
})
export class ShoppingListComponent implements OnInit {
  items: Ingredient[] = [];
  selectedItem: Ingredient = null;
  constructor(private shoppingList: ShoppingListService) { }

  ngOnInit() {
    this.items = this.shoppingList.getItems();
  }
  onSelectItem(item: Ingredient) {
    this.selectedItem = item;
  }
  onCleared(){
    this.selectedItem = null;
  }



}
