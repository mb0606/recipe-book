import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';

@Injectable()
export class RecipeService {
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
  constructor() { }

  getRecipes() {
    return this.recipes;
  }

}
