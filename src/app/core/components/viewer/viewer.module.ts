import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import AppViewerComponent from './viewer.component';
import AppViewerHeaderComponent from './viewer-header.component';
import AppViewerBodyComponent from './viewer-body.component';

@NgModule({
  declarations: [
    AppViewerComponent,
    AppViewerHeaderComponent,
    AppViewerBodyComponent,
  ],
  imports: [CommonModule],
  exports: [
    AppViewerComponent,
    AppViewerHeaderComponent,
    AppViewerBodyComponent,
  ],
})
export default class AppViewerModule {}
