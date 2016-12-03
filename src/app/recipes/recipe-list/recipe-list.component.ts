import {Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe';
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'rb-recipe-list',
  template:`
  <div class="row">
    <div class="col-xs-12">
      <a class="btn btn-default" [routerLink]="['new']">New Recipe</a>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12">
      <ul class="list-group">
        <rb-recipe-item *ngFor="let recipe of recipes; let i = index" [recipe]="recipe" [recipeId]="i"></rb-recipe-item>
      </ul>
    </div>
  </div>
`
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => this.recipes = recipes
    )
  }



}
