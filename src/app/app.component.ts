import { Component } from '@angular/core';

@Component({
  selector: 'rb-root',
  template: `
    <rb-header></rb-header>
    <div class="container">
      <router-outlet></router-outlet>    
    </div>

`
})
export class AppComponent {

}
