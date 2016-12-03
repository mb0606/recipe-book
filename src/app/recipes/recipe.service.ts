import {Injectable, EventEmitter} from '@angular/core';
import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';
import {Headers, Http, Response} from "@angular/http";

import 'rxjs/Rx';

@Injectable()
export class RecipeService {

  recipesChanged = new EventEmitter();

  private   recipes: Recipe[] = [
    new Recipe('cup cake',
      'this is the description of the recipe',
      'http://www.rachaelskitchen.co.uk/wp-content/uploads/valentines-dark-pink-rose-cupcake-300x300.jpg', [
        new Ingredient('French fries',2),
        new Ingredient('Flour', 1)
      ]),
    new Recipe('Summer Salad',
      'this is the description of the salad',
      'https://upload.wikimedia.org/wikipedia/commons/9/94/Salad_platter.jpg',[
        new Ingredient('Sugar',2),
        new Ingredient('Egg', 1)
      ])
  ];
  constructor(private http: Http) { }

  getRecipes() {
    return this.recipes;
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }
  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1)
  }
  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
  }
  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
    const body = JSON.stringify(this.recipes)
    const headers = new Headers({
      'Content-type': 'application/json'
    });
    return this.http.put('https://recipe-book-887eb.firebaseio.com/recipes.json',
    body,
      { headers: headers }
    )
  }

  fetchData() {
    return this.http.get('https://recipe-book-887eb.firebaseio.com/recipes.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Recipe[]) => {
          this.recipes = data;
          this.recipesChanged.emit(this.recipes);
        }

      )
  }

}
