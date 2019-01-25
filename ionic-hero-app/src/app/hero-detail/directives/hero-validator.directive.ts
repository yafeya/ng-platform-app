import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHeroValidator]'
})
export class HeroValidatorDirective {
  constructor(private el: ElementRef) { }
  
  private changeFontSize(size: number) {
    this.el.nativeElement.style.fontSize = `${size}px`;
    console.log(`Change the font size to ${size}`)
  }

  @HostListener('mousedown')
  onMouseDown() {
    this.changeFontSize(20);
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.changeFontSize(14);
  }
}
