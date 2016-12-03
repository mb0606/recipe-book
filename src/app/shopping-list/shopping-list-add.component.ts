import {Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {Ingredient} from "../shared/ingredient";
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'rb-shopping-list-add',
  template: `
<hr>
  <div class="row">
    <div class="col-xs-12">
      <form id="shopping-list-add" (ngSubmit)="onSubmit(f.value); f.reset()" #f="ngForm">
        <div class="row">
          <div class="col-sm-5 form-group">
            <label for="item-name">Name</label>
            <input type="text" 
                   id="item-name"
                   class="form-control"
                   required
                   [ngModel]="item.name"
                   name="name">
           </div> <!-- col-sm-5 from group -->

          <div class="col-sm-2 form-group">
            <label for="item-amount">Amount</label>
            <input type="text" 
                   id="item-amount" 
                   class="form-control"
                   required
                   [ngModel]="item.amount"
                   name="amount">
          </div><!-- col-sm-2 from group -->
        </div><!-- row -->
        <div class="row">
          <div class="col-xs-12">
            <button class="btn btn-success" [disabled]="!f.valid" *ngIf="isAdd"   type="submit" >Add</button>
            <button class="btn btn-success" [disabled]="!f.valid" *ngIf="!isAdd" type="submit">Save</button>
            <button class="btn btn-danger"  (click)="onDelete()" *ngIf="!isAdd" type="button">Delete Item</button>
            <button class="btn btn-primary" (click)="onClear()" *ngIf="!isAdd" type="button">Clear</button>
          </div> <!-- col-xs-12 -->
        </div><!-- row -->
      </form> <!-- form -->
    </div> <!-- col-xs-12 -->
  </div> <!-- row -->

  `
})
export class ShoppingListAddComponent implements OnChanges {
  @Input() item: Ingredient;
  @Output() cleared = new EventEmitter()
  isAdd = true;
  constructor(private sls: ShoppingListService) { }

  ngOnChanges(changes) {
    // checks anything that can be changed from outside
    if(changes.item.currentValue === null){
      this.isAdd = true;
      this.item = {name: null, amount:null}
    }  else {
      this.isAdd = false;
    }
  }

  onSubmit(ingredient: Ingredient){
    const newIngredient = new Ingredient(ingredient.name, ingredient.amount)
     if (!this.isAdd) {
       this.sls.editItem(this.item, newIngredient)
       this.onClear()
     } else {
       this.item  = newIngredient
       this.sls.addItem(this.item)
       this.item =  {name: null, amount:null};
     }
  }
  onDelete(){
    this.sls.deleteItem(this.item);
    this.onClear()
  }
  onClear(){
    this.isAdd = true;
    this.cleared.emit(null)

  }

}
