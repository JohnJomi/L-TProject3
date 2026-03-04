import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appHighlightSalary]',
    standalone: true
})
export class HighlightSalaryDirective implements OnChanges {
    @Input() salary: number = 0;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnChanges() {
        if (this.salary > 50000) {
            this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#e6fffa'); // subtle teal background
            this.renderer.setStyle(this.el.nativeElement, 'borderLeft', '4px solid #00b5ad');
        } else {
            this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
            this.renderer.removeStyle(this.el.nativeElement, 'borderLeft');
        }
    }
}
