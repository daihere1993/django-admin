import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { WordtableComponent, _AppGroupdDialog } from './wordtable.component';
import { wordReducer, wordGroupReducer, wordListReducer } from '@states/word/word.reducer';
import { WordEffect } from '@states/word/word.effect';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppViewerModule } from '@components/viewer';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppSnackBarModule } from '@components/snackbar';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        StoreModule.forFeature('word', wordReducer),
        StoreModule.forFeature('word_group', wordGroupReducer),
        StoreModule.forFeature('word_list', wordListReducer),
        EffectsModule.forFeature([WordEffect]),
        MatPaginatorModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        MatIconModule,
        MatDialogModule,
        MatSelectModule,
        MatSidenavModule,
        MatButtonModule,
        AppViewerModule,
        NgxDatatableModule,
        AppSnackBarModule
    ],
    declarations: [WordtableComponent, _AppGroupdDialog]
})
export class WordtableModule {}
