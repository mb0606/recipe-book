import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe'

@Component({
  selector: 'rb-recipe-item',
  template:`
  <div  class="list-group-item clearfix">
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
  </div>

`
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  recipeId: number;

  constructor() { }

  ngOnInit() {
  }

}
