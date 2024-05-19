import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogsModule } from './dialogs/dialogs.module';

import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { ErrorComponent } from './error/error.component';
import { BackBtnComponent } from './back-btn/back-btn.component';
import { SuccessMessageComponent } from './success-message/success-message.component';

import { PipesModule } from './pipes/pipes.module';
import { DirectivesModule } from './directives/directives.module';
import { IconsModule } from '../icons.module';

@NgModule({
  declarations: [],
  imports: [
    DialogsModule,
    ScrollTopComponent,
    ErrorComponent,
    BackBtnComponent,
    SuccessMessageComponent,
    PipesModule,
    DirectivesModule,
    DialogsModule,
    IconsModule,
  ],
  exports: [
    DialogsModule,
    ScrollTopComponent,
    ErrorComponent,
    BackBtnComponent,
    SuccessMessageComponent,
    PipesModule,
    DirectivesModule,
    DialogsModule,
    IconsModule,
  ],
})
export class SharedModule {}
