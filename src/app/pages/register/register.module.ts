import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { ResgisterRoutingModule } from './register-routing.module';
import { ButtonComponent } from "../../core/shared/components/button/button.component";
import { CheckboxComponent } from "../../core/shared/components/checkbox/checkbox.component";
import { IconComponent } from "../../core/shared/components/icon/icon.component";
import { InputComponent } from "../../core/shared/components/input/input.component";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [RegisterComponent],
    imports: [
        CommonModule,
        ResgisterRoutingModule,
        ButtonComponent,
        CheckboxComponent,
        IconComponent,
        InputComponent,
        ReactiveFormsModule
    ]
})
export class RegisterModule { }