import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WordtableModule } from './wordtable/wordtable.module';

@NgModule({
    imports: [CommonModule, FormsModule, WordtableModule]
})
export class PagesModule {}
