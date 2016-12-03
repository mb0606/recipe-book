import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe'

@Component({
  selector: 'rb-recipe-item',
  template:`
  
  <a [routerLink]="[recipeId]"  class="list-group-item clearfix" routerLinkActive="active">
    <div class="pull-left">
      <h4 class="list-group-item-heading">{{ recipe.name}}</h4>
      <p class="list-group-item-text">{{recipe.description}}</p>
    </div>
    <span class="pull-right">
      <img
        src="{{recipe.imagePath}}"
        alt=""
        class="img-responsive"
        style=" height: 100px ">
    </span>

  </a>

`
})
export class RecipeItemComponent  {
  @Input() recipe: Recipe;
  @Input() recipeId: number;



}
