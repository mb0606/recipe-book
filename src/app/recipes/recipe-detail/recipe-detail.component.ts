import {Component, OnInit, OnDestroy} from '@angular/core';
import { Recipe } from '../recipe'
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from 'rxjs/Rx';
import {RecipeService} from "../recipe.service";

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
    <button class="btn btn-primary"(click)="onEdit()">Edit</button>
    <button class="btn btn-danger" (click)="onDelete()">Delete</button>
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
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private recipeIndex: number
  selectedRecipe: Recipe;

  constructor(private shoppingList: ShoppingListService,
              private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router
              ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.recipeIndex = params['id'];
        this.selectedRecipe = this.recipeService.getRecipe(this.recipeIndex);
      }
    )
  }
  onEdit(){
    this.router.navigate(['/recipes', this.recipeIndex, 'edit']);
  }
  onDelete(){
    this.recipeService.deleteRecipe(this.selectedRecipe);
    this.router.navigate(['/recipes']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddToShoppingList() {
    this.shoppingList.addItems(this.selectedRecipe.ingredients);
  }

}
