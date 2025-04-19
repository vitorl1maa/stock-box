import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() placeholder: string = "Digite aqui...";
  @Input() class: string = "";
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() type: 'text' | 'email' | 'currency' | 'password' = 'text';
  @Input() disabled: boolean = false;
  @Input() icon?: string;
  @Input() value: string = '';

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: string): void {
    this.value = value || '';
    this.onChange(this.value);
  }


  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

}
