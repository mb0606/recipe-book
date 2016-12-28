import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms";

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListAddComponent } from './shopping-list-add.component';
import { CommonModule } from "@angular/common";
import {shoppingListRouting} from "./shopping-list.routes";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListAddComponent
  ],
  imports :[
    FormsModule,
    SharedModule,
    shoppingListRouting
  ]

})
export class ShoppingListModule {}
