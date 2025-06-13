import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  standalone: true,
  imports: [CommonModule]
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder: string = 'Digite aqui...';
  @Input() class: string = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() type: 'text' | 'email' | 'currency' | 'password' = 'text';
  @Input() disabled: boolean = false;
  @Input() icon?: string;

  value: string = '';
  touched: boolean = false;

  onChange: any = () => { };
  onTouched: any = () => { };

  ngOnInit() {
    console.log('Input initialized with value:', this.value);
  }

  writeValue(value: string): void {
    console.log('writeValue called with:', value);
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    console.log('Input value changed:', value);
    this.value = value;
    this.onChange(value);
    this.markAsTouched();
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
