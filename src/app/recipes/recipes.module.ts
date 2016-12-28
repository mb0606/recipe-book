import { NgModule } from "@angular/core"
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start.component';
import { RecipesRouting } from "./recipes.routes";
import { SharedModule}  from "../shared/shared.module";


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeStartComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RecipesRouting
  ]

})

export class RecipesModule {}
