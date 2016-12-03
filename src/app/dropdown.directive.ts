import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[rbDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') get opened() {
    return this.isOpen;
  }
  @HostListener('click') open() {
    if(this.isOpen){
      return this.isOpen = false;
    }
      return this.isOpen = true;
  }
  @HostListener('mouseleave') close(){
    this.isOpen = false
  }
  private isOpen = false;
}
