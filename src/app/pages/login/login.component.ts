import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/api/auth/auth.service';
import { LoginRequest } from '../../core/interfaces/auth.interface';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  @ViewChild('svgContainer') svgContainer!: ElementRef;

  googleIcon = "../../../assets/images/login/logos--google-icon.svg";
  facebookIcon = "../../../assets/images/login/logos--facebook.svg";
  hidePassword: boolean = true;
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadSvgInline('../../../assets/images/login/apresentation.svg');
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, [Validators.requiredTrue]]
    });
  }

  loadSvgInline(file: string): void {
    this.http.get(file, { responseType: 'text' }).subscribe((svg: string) => {
      const sanitizedSvg = this.sanitizer.bypassSecurityTrustHtml(svg);
      this.svgContainer.nativeElement.innerHTML = svg;

      const svgElement = this.svgContainer.nativeElement.querySelector('svg');
      svgElement?.classList.add('animated');
    });
  }

  tooglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  onSignIn() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const credentials: LoginRequest = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Erro ao fazer login. Tente novamente.';
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName === 'email' ? 'E-mail' : 'Senha'} é obrigatório.`;
      }
      if (field.errors['email']) {
        return 'E-mail inválido.';
      }
      if (field.errors['minlength']) {
        return 'Senha deve ter pelo menos 6 caracteres.';
      }
    }
    return '';
  }
}

