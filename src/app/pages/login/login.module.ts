import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ButtonComponent } from "../../core/shared/components/button/button.component";
import { InputComponent } from "../../core/shared/components/input/input.component";
import { IconComponent } from "../../core/shared/components/icon/icon.component";
import { CheckboxComponent } from "../../core/shared/components/checkbox/checkbox.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ButtonComponent,
    InputComponent,
    IconComponent,
    CheckboxComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class LoginModule { }
