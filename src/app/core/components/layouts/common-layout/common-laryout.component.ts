import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { NavMenuItem } from '@interface/common';

@Component({
    selector: 'app-common-layout',
    templateUrl: './common-layout.component.html'
})
export class AppCommonLayoutComponent {
    public menus: NavMenuItem[] = [
        {
            name: 'Wordtable',
            link: '/app/wordtable',
            icon: 'home'
        }
    ];

    constructor(public router: Router) {}
}
