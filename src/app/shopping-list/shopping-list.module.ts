import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms";

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListAddComponent } from './shopping-list-add.component';
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListAddComponent
  ],
  imports :[
    FormsModule,
    CommonModule
  ]

})
export class ShoppingListModule {}
