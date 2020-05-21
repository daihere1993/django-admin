import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import AppSnackBarComponent from './snacbar.component';

@NgModule({
  declarations: [AppSnackBarComponent],
  imports: [CommonModule, MatSnackBarModule],
  exports: [AppSnackBarComponent],
})
export default class AppSnackBarModule {}
