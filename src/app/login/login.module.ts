import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page/login-page.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [LoginPageComponent,],
  imports: [
    CoreModule
  ],
  exports: [LoginPageComponent]
})
export class LoginModule { }
