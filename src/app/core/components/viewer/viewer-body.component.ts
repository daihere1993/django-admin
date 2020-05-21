import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-viewer app-viewer-body',
  styleUrls: ['./viewer.component.scss'],
  template: ` <ng-content></ng-content> `,
  encapsulation: ViewEncapsulation.None,
})
export default class AppViewerBodyComponent {
  @HostBinding('class.app-viewer__body') public readonly appViewerBody = true;
}
