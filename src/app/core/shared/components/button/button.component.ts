import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() type: 'default' | 'outline' | 'disabled' = 'default';
  @Input() disabled: boolean = false;
}
