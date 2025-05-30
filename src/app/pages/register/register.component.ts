import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit {
  @ViewChild('svgContainer') svgContainer!: ElementRef;

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadSvgInline('../../../assets/images/login/checking-boxes-animate.svg');
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

  toogleConfirmPassword() {
    this.hideConfirmPassword = !this.hideConfirmPassword
  }

  backHome() {
    this.router.navigate(['/'])
  }

}
