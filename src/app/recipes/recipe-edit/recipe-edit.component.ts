import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {Subscription} from "rxjs/Rx";
import {Recipe} from "../recipe";
import {FormArray,
        FormControl,
        FormGroup,
        Validators,
        FormBuilder} from "@angular/forms";
import {Location} from '@angular/common';

@Component({
  selector: 'rb-recipe-edit',
  template: `
    <div class="row">
      <div class="col-xs-12">
        <form [formGroup]="recipeForm" (ngSubmit)="onSubmit()">
          <div class="row">
            <div class="col-xs-12">
              <button type="submit" class="btn btn-success"
              [disabled]="!recipeForm.valid">Save</button>
              <a class="btn btn-danger"
                        (click)="onCancel()">Cancel</a>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <div class="form-group">
                <label for="name">Title</label>
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  formControlName="name">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <div class="form-group">
                <label for="image-url"
                >Image Url</label>
                <input
                  type="text"
                  id="image-url"
                  class="form-control"
                  formControlName="imagePath"
                  #imageUrl>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <div class="img">
                <img style="max-height:300px" [src]="imageUrl.value">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <div class="form-group">
                <label for="content">Content</label>
                <textarea
                  type="text"
                  id="content"
                  rows="6"
                  class="form-control"
                  formControlName="description"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <ul class="list-group" formArrayName="ingredients">
                <div
                  class="row" 
                  *ngFor="let ingredient of recipeForm.controls['ingredients'].controls; let i = index">
                  <div formGroupName="{{i}}">
                    <div class="col-sm-5">
                      <input
                        type="text"
                        class="form-control"
                        formControlName="name">
                    </div>
                    <div class="col-sm-5">
                      <input
                        type="text"
                        class="form-control"
                        formControlName="amount">
                    </div>
                    <div class="col-sm-2">
                      <button 
                          class="btn btn-danger"
                          (click)="onRemoveItem(i)">X</button>
                    </div>
                  </div><!-- formGroupName -->
    
                  <br><br>
                </div>
              </ul><!-- ul formArrayName ingredients -->
            </div>
          </div>
        </form><!-- form end -->
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-xs-12">
        <div class="form-group row">
          <div class="col-md-5"><input type="text" class="form-control" #itemName></div>
          <div class="col-md-5"><input type="text" class="form-control" #itemAmount></div>
          <div class="col-md-2">
            <button
              type="button"
              class="btn btn-primary"
              (click)="onAddItem(itemName.value, itemAmount.value); 
                       itemName.value = null; 
                       itemAmount.value = null">+</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;
  private recipeIndex: number;
  private recipe: Recipe;
  private isNew = true;
  private subscription: Subscription;



  constructor(private route:ActivatedRoute,
              private recipeService: RecipeService,
              private formBuilder: FormBuilder,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.recipeIndex = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.recipeIndex);
        } else {
          this.isNew = true;
          this.recipe = null;
        }
        this.initForm();
      }
    );
  }

  onSubmit() {
    const newRecipe = this.recipeForm.value;
    if (this.isNew) {
      this.recipeService.addRecipe(newRecipe);
    } else {
      this.recipeService.editRecipe(this.recipe, newRecipe);
    }
    this.navigateBack();
  }

  private navigateBack() {
    // this.router.navigate(['../']);
    this.location.back();
  }
  onCancel(){
    this.navigateBack();
  }
  onRemoveItem(index: number) {
    console.log((<FormArray>this.recipeForm.controls['ingredients']));
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);
  }
  onAddItem( name: string, amount: string) {
    (<FormArray>this.recipeForm.controls['ingredients']).push(
      new FormGroup({
        name: new FormControl(name, Validators.required),
        amount: new FormControl(amount, [
          Validators.required,
          Validators.pattern("\\d+")
        ])
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initForm() {
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeContent = '';
    let recipeIngredients: FormArray = new FormArray([]);

    if (!this.isNew) {
      if (this.recipe.hasOwnProperty('ingredients')) {
        for (let i = 0; i < this.recipe.ingredients.length; i++) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
              amount: new FormControl(this.recipe.ingredients[i].amount, [
                Validators.required,
                Validators.pattern("\\d+")
              ])
            })
          );
        }
      }
      recipeName = this.recipe.name;
      recipeImageUrl = this.recipe.imagePath;
      recipeContent = this.recipe.description;
    } // IF
    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImageUrl, Validators.required],
      description: [recipeContent, Validators.required],
      ingredients: recipeIngredients
    });
  }

}
