import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Recipe } from '../recipe';
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'rb-recipe-list',
  template:`
  <div class="row">
    <div class="col-xs-12">
      <a class="btn btn-default">New Recipe</a>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12">
      <ul class="list-group">
        <rb-recipe-item *ngFor="let recipe of recipes" [recipe]="recipe" (click)="onSelected(recipe)"></rb-recipe-item>
      </ul>
    </div>
  </div>
`
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  onSelected(recipe: Recipe){
    console.log(recipe)
    this.recipeSelected.emit(recipe);
  }

}
