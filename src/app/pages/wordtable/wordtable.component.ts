import { listSelector, WordListState, selectAllWordLists } from './../../core/states/word/word.reducer';
import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, Inject, EventEmitter } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';

import { Word, WordGroup, WordList } from '@definition/word';
import { selectAllWords, selectAllWordGroups, CacheState } from '@states/word/word.reducer';
import * as wordActions from '@states/word/word.action';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSnackBarComponent } from '@components/snackbar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';

function getObjByName(objs: { name?: string }[], name: string): object {
    for (const list of objs) {
        if (list.name === name) {
            return list;
        }
    }
    throw new Error(`No such name: ${name}`);
}

@Component({
    selector: 'app-wordtable',
    templateUrl: './wordtable.component.html',
    styleUrls: ['./wordtable.component.scss']
})
export class WordtableComponent implements OnInit {
    /** Global */
    public latestWordLists: WordList[];
    public wordListCache: CacheState<WordList>;
    public wordGroups: WordGroup[];
    public get entity(): Word {
        return {
            name: this.wordName,
            description: this.wordDes,
            group: this.selectedGroup,
            list: this.selectedList
        };
    }
    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
    @ViewChild('wordNameInput', { static: true }) wordNameInputRef: ElementRef;
    @ViewChild('wordDesInput', { static: true }) wordDesInputRef: ElementRef;

    /** Table */
    public selectedRow: Word;
    public tableData$: Subject<Word[]> = new Subject();
    public tableCols = [
        { name: 'Word', prop: 'name', flexGrowp: 1, template: 'normal' },
        { name: 'Description', prop: 'description', flexGrowp: 1, template: 'normal' },
        { name: 'Phonetic', prop: 'phonetic', flexGrowp: 3, template: 'phoneticTemplate' }
    ];
    private tableCache: Word[];

    /** Table filter */
    public filterParams: { group: WordGroup; list: WordList } = { group: {}, list: {} };
    public set filterGroupName(name: string) {
        this.filterParams.group = name ? getObjByName(this.wordGroups, name) : {};
        this.filterListName = null;
        this.loadWords();
        this.loadWordLists(this.filterParams.group && this.filterParams.group._id);
    }
    public get filterGroupName(): string {
        return this.filterParams.group.name;
    }
    public set filterListName(name: string) {
        this.filterParams.list = name ? getObjByName(this.filterLists, name) : {};
        this.loadWords();
    }
    public get filterListName(): string {
        return this.filterParams.list.name;
    }
    public get filterLists(): WordList[] {
        if (this.filterParams && this.filterParams.group) {
            const cache = this.getWordLists(this.filterParams.group._id);
            return cache ? cache : this.latestWordLists;
        }
    }

    /** Form */
    private _wordName: string;
    get wordName(): string {
        return this._wordName ? this._wordName : this.selectedRow && this.selectedRow.name;
    }
    set wordName(value: string) {
        this._wordName = value;
    }
    private _wordDes: string;
    get wordDes(): string {
        return this._wordDes ? this._wordDes : this.selectedRow && this.selectedRow.description;
    }
    set wordDes(value: string) {
        this._wordDes = value;
    }
    /** From group */
    public get selectedGroup(): WordGroup {
        if (this.selectedGroupName) {
            return getObjByName(this.wordGroups, this.selectedGroupName);
        }
    }
    private _selectedGroupName: string;
    public set selectedGroupName(name: string) {
        if (name && name !== this._selectedGroupName) {
            this._selectedGroupName = name;
            this.loadWordLists(this.selectedGroup._id);
        } else {
            this._selectedGroupName = name;
        }
    }
    public get selectedGroupName(): string {
        return this._selectedGroupName;
    }
    /** Form list */
    public get formLists(): WordList[] {
        if (this.selectedGroup) {
            const cache = this.getWordLists(this.selectedGroup._id);
            return cache ? cache : this.latestWordLists;
        }
    }
    public get selectedList(): WordList {
        return getObjByName(this.formLists, this.selectedListName);
    }
    public selectedListName: string;

    constructor(private snackBar: MatSnackBar, private store$: Store<any>, private groupDialog: MatDialog) {}

    ngOnInit(): void {
        this.loadWords();
        this.store$.dispatch({ type: wordActions.ActionTypes.LOAD_WORD_GROUPS });
        this.store$.select(selectAllWords).subscribe((data) => {
            this.tableCache = data;
            this.tableData$.next(data.reverse());
        });
        this.store$.select(selectAllWordGroups).subscribe((data) => {
            this.wordGroups = data;
        });
        this.store$.select(selectAllWordLists).subscribe((data) => {
            this.latestWordLists = data;
        });
        this.store$
            .select(
                createSelector(listSelector, (state: WordListState) => {
                    return state.caches;
                })
            )
            .subscribe((data) => {
                this.wordListCache = data;
            });
    }

    tableSelectCheck(row: Word) {
        return this['selected'].indexOf(row) === -1;
    }

    onSelectRow({ selected }) {
        if (selected.length) {
            this.selectedGroupName = selected[0].group.name;
            this.selectedListName = selected[0].list.name;
            this.selectedRow = selected[0];
        } else {
            this.selectedRow = null;
            this.emptyForm();
        }
    }

    getCellValue(column, value) {
        if (column.prop === 'phonetic') {
            return value && value.symbols[0];
        } else {
            return value;
        }
    }

    addGroup(): void {
        this.openDialog((result) => {
            if (result) {
                this.store$.dispatch({
                    type: wordActions.ActionTypes.ADD_GROUP,
                    payload: result
                });
            }
        });
    }

    addList() {
        this.openDialog((result) => {
            if (result) {
                result.group = this.selectedGroup._id;
                this.store$.dispatch({
                    type: wordActions.ActionTypes.ADD_WORD_LIST,
                    payload: result
                });
            }
        });
    }

    private openDialog(onClosedCb: (ret: any) => void) {
        const dialogRef = this.groupDialog.open(_AppGroupdDialog, {
            width: '300px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(onClosedCb);
    }

    onSave() {
        if (this.wordName && this.wordDes) {
            if (this.selectedRow) {
                this.store$.dispatch({
                    type: wordActions.ActionTypes.EDIT,
                    payload: {
                        id: this.selectedRow._id,
                        changes: this.entity
                    }
                });
            } else {
                this.store$.dispatch({
                    type: wordActions.ActionTypes.ADD,
                    payload: this.entity
                });
                this.wordName = '';
                this.wordDes = '';
            }
            // Change blur to word input from description
            this.wordDesInputRef.nativeElement.blur();
            this.wordNameInputRef.nativeElement.focus();

            this.snackBar.openFromComponent(AppSnackBarComponent, {
                verticalPosition: 'top',
                duration: 500
            });
        }
    }

    onDelete() {
        this.store$.dispatch({
            type: wordActions.ActionTypes.DELETE,
            payload: this.selectedRow._id
        });
        this.emptyForm();
    }

    onFileterTable(event) {
        const val = event.target.value.trim().toLowerCase();
        const tmp = this.tableCache.filter((item) => {
            return item.name.toLowerCase().indexOf(val) !== -1 || !val;
        });

        this.tableData$.next(tmp);
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }

    private emptyForm() {
        this.wordName = null;
        this.wordDes = null;
        // this.selectedGroupName = null;
        // this.selectedListName = null;
    }

    private getWordLists(groupId: string) {
        return this.wordListCache[groupId];
    }

    private loadWordLists(id: string) {
        this.store$.dispatch({
            type: wordActions.ActionTypes.LOAD_WORD_LISTS,
            payload: { groupId: id }
        });
    }

    private loadWords() {
        this.store$.dispatch({
            type: wordActions.ActionTypes.LOAD_WORDS,
            payload: { groupId: this.filterParams.group._id, listId: this.filterParams.list._id }
        });
    }
}

@Component({
    selector: '_app-group-dialog',
    template: `
        <div mat-dialog-content>
            <mat-form-field>
                <mat-label>Name</mat-label>
                <input matInput [(ngModel)]="data.name" autocomplete="off" />
            </mat-form-field>
            <mat-form-field>
                <mat-label>Description</mat-label>
                <input matInput [(ngModel)]="data.description" autocomplete="off" />
            </mat-form-field>
        </div>
        <div mat-dialog-actions>
            <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Save</button>
            <button mat-button (click)="onCancel()">Cancel</button>
        </div>
    `
})
export class _AppGroupdDialog {
    constructor(
        public dialogRef: MatDialogRef<_AppGroupdDialog>,
        @Inject(MAT_DIALOG_DATA)
        public data: WordGroup
    ) {}

    onCancel(): void {
        this.dialogRef.close();
    }
}
