import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-viewer',
  styleUrls: ['./viewer.component.scss'],
  template: ` <ng-content></ng-content> `,
  encapsulation: ViewEncapsulation.None,
})
export default class AppViewerComponent {
  @HostBinding('class.app-viewer') public readonly appViewer = true;

  @HostBinding('class.app-shadow--2dp') public readonly appShadow2DP = true;
}
