import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe';

@Component({
  selector: 'rb-recipes',
  template: `
    <div class="row">
      <div class="col-md-5">
        <rb-recipe-list></rb-recipe-list>
      </div>
      <div class="col-md-7">
        <router-outlet></router-outlet>
      </div>
    </div>`
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor() { }

  ngOnInit() {
  }

}
