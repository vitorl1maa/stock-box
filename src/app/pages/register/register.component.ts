import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/api/auth/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})

export class RegisterComponent implements OnInit {
  @ViewChild('svgContainer') svgContainer!: ElementRef;

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  registerForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loadSvgInline('../../../assets/images/login/checking-boxes-animate.svg');
    this.formFields();
  }

  formFields() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  loadSvgInline(file: string): void {
    this.http.get(file, { responseType: 'text' }).subscribe((svg: string) => {
      this.svgContainer.nativeElement.innerHTML = svg;

      const svgElement = this.svgContainer.nativeElement.querySelector('svg');
      svgElement?.classList.add('animated');
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true }
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword
  }

  toggleConfirmPassword() {
    this.hideConfirmPassword = !this.hideConfirmPassword
  }

  backLogin() {
    this.router.navigate(['/'])
  }

  submit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.value;
    const { confirmPassword, ...payload } = formValue;

    this.userService.createUser(payload).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.registerForm.markAllAsTouched()
    });
  }

}
