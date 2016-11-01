import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe'
import {ShoppingListService} from "../../shopping-list/shopping-list.service";

@Component({
  selector: 'rb-recipe-detail',
  template: `
<div class="row">
  <div class="col-xs-12">
    <img style="max-height:300px" src="{{selectedRecipe?.imagePath}}" alt="" class="img-responsive">
  </div><!-- col xs 12 -->
</div><!-- row -->
<div class="row">
  <div class="col-xs-12">
    <h1>{{selectedRecipe?.name}}</h1>
  </div> <!-- col xs 12 -->
  <div class="col-xs-12">
    <button class="btn btn-success" (click)="onAddToShoppingList()">To Shopping List</button>
    <button class="btn btn-primary">Edit</button>
    <button class="btn btn-danger">Delete</button>
  </div><!-- col xs 12 -->
</div> <!-- row -->
<div class="row">
  <div class="col-xs-12">
    <p>{{selectedRecipe?.description}}</p>
  </div><!-- col xs 12 -->
</div><!-- row -->
<hr>
<div class="row">
  <div class="col-xs-12">
  <ul class="list-group">
    <li class="list-group-item" *ngFor="let item of selectedRecipe?.ingredients">{{item.name}} | {{item.amount}}</li>
  </ul>
    
  </div><!-- col xs 12 -->
</div><!-- row -->
`
})
export class RecipeDetailComponent implements OnInit {
  @Input() selectedRecipe: Recipe;

  constructor(private shoppingList: ShoppingListService) { }
  onAddToShoppingList() {
    this.shoppingList.addItem(this.selectedRecipe.ingredients);
  }

  ngOnInit() {
  }

}
