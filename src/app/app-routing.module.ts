import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  AppLayoutsModule,
  AppCommonLayoutComponent,
} from '@components/layouts';
import { WordtableComponent } from './pages/wordtable';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'app/dashboard', pathMatch: 'full' },
        {
          path: 'app',
          component: AppCommonLayoutComponent,
          children: [
            {
              path: 'wordtable',
              component: WordtableComponent,
              pathMatch: 'full',
            },
          ],
        },
        { path: '**', redirectTo: '/app/wordtable' },
      ],
      { useHash: true },
    ),
    AppLayoutsModule,
  ],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
