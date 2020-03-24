import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-viewer app-viewer-header',
    styleUrls: ['./viewer.component.scss'],
    template: `
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AppViewerHeaderComponent {
    @HostBinding('class.app-viewer__header')
    public readonly appViewerHeader = true;
}
