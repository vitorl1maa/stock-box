import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { ResgisterRoutingModule } from './register-routing.module';


@NgModule({
    declarations: [RegisterComponent],
    imports: [
        CommonModule,
        ResgisterRoutingModule
    ]
})
export class RegisterModule { }