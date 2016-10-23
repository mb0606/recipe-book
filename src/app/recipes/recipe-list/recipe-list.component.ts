import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  @Output() recipeSelected = new EventEmitter<Recipe>();
  recipe = new Recipe('cup cake',
                  'this is the description of the recipe',
                  'http://healthyrise.com/wp-content/uploads/2016/07/Cupcake-2.png')

  constructor() { }

  ngOnInit() {
  }

  onSelected(recipe: Recipe){
    console.log(recipe)
    this.recipeSelected.emit(recipe);
  }

}
