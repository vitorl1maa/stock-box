import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('svgContainer') svgContainer!: ElementRef;

  googleIcon = "../../../assets/images/login/logos--google-icon.svg";
  facebookIcon = "../../../assets/images/login/logos--facebook.svg";
  isChecked = false;
  hidePassword: boolean = true;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadSvgInline('../../../assets/images/login/apresentation.svg');
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
    this.hidePassword = !this.hidePassword
  }

  onSignIn() {
    this.router.navigate(['/home'])
  }

  onRegister() {
    this.router.navigate(['/register'])
  }
}

