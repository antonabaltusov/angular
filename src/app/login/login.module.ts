import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page/login-page.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CoreModule, SharedModule],
  exports: [LoginPageComponent],
})
export class LoginModule {}
