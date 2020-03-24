import { listSelector, WordListState, CacheState } from './word.reducer';
import { Store, createSelector } from '@ngrx/store';
import { Word, WordList, WordGroup } from '@statics/models/word.model';
import { EntityService } from '@services/entity.service';
import { Injectable } from '@angular/core';
import { Observable, of, merge } from 'rxjs';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as _ from 'lodash';

import * as wordActions from './word.action';

function getCacheDate<T>(key: string, caches: CacheState<T>): T[] | boolean {
    for (let _key in caches) {
        if (key === _key) {
            return caches[key];
        }
    }
    return false;
}

@Injectable()
export class WordEffect {
    constructor(private entityService: EntityService, private actions$: Actions, private store$: Store<any>) {}

    @Effect() loadWord$: Observable<wordActions.LoadWordsSuccess> = this.actions$.pipe(
        ofType(wordActions.ActionTypes.LOAD_WORDS),
        mergeMap(({ payload }) => {
            const groupId = payload['groupId'];
            const listId = payload['listId'];
            return this.entityService
                .getEntities<Word>({
                    model: 'word',
                    filter: [
                        { field: 'group', match: 'EQ', value: groupId },
                        { field: 'list', match: 'EQ', value: listId }
                    ]
                })
                .pipe(
                    map((ret) => {
                        return new wordActions.LoadWordsSuccess(ret.entities);
                    })
                );
        })
    );

    @Effect() loadWordGroup$: Observable<wordActions.LoadWordGroupSuccess> = this.actions$.pipe(
        ofType(wordActions.ActionTypes.LOAD_WORD_GROUPS),
        mergeMap(() => {
            return this.entityService
                .getEntities<WordGroup>({ model: 'word_group' })
                .pipe(
                    map((ret) => {
                        return new wordActions.LoadWordGroupSuccess(ret.entities);
                    })
                );
        })
    );

    @Effect() loadWordList$: Observable<
        wordActions.LoadWordListSuccess | wordActions.UpdateWordListCache
    > = this.actions$.pipe(
        ofType(wordActions.ActionTypes.LOAD_WORD_LISTS),
        withLatestFrom(
            this.store$.select(
                createSelector(listSelector, (state: WordListState) => {
                    return state.caches;
                })
            )
        ),
        map(([{ payload }, caches]) => {
            const groupId = payload['groupId'];
            const cache = getCacheDate<WordList>(groupId, caches);
            return { cache, groupId };
        }),
        mergeMap(({ cache, groupId }) => {
            if (!cache) {
                return this.entityService
                    .getEntities<WordList>({
                        model: 'word_list',
                        filter: { field: 'group', match: 'EQ', value: groupId }
                    })
                    .pipe(
                        mergeMap((ret) => {
                            // Update cache data
                            return [
                                new wordActions.UpdateWordListCache({ cache: ret.entities, groupId }),
                                new wordActions.LoadWordListSuccess(ret.entities)
                            ];
                        })
                    );
            } else {
                // Use cache data
                return of(new wordActions.LoadWordListSuccess(cache as WordList[]));
            }
        })
    );

    @Effect() addWord$: Observable<wordActions.AddWordSuccess> = this.actions$.pipe(
        ofType(wordActions.ActionTypes.ADD),
        mergeMap(({ payload }) => {
            const word: Word = payload;
            return this.entityService
                .addEntity<Word>({ model: 'word', entity: word, retFields: ['phonetic'] })
                .pipe(
                    map((ret) => {
                        word._id = ret._id;
                        word.phonetic = ret.value.phonetic;
                        return new wordActions.AddWordSuccess(word);
                    })
                );
        })
    );

    @Effect() editWord$: Observable<wordActions.EditWordSuccess> = this.actions$.pipe(
        ofType(wordActions.ActionTypes.EDIT),
        mergeMap(({ payload }) => {
            const change: wordActions.UpdateStr<Word> = payload;
            return this.entityService
                .updateEntity<Word>({
                    model: 'word',
                    id: change.id,
                    value: change.changes
                })
                .pipe(
                    map((ret) => {
                        return new wordActions.EditWordSuccess(change);
                    })
                );
        })
    );

    @Effect() addGroup$: Observable<wordActions.AddWordGroupSuccess> = this.actions$.pipe(
        ofType(wordActions.ActionTypes.ADD_GROUP),
        mergeMap(({ payload }) => {
            const group: WordGroup = payload;
            return this.entityService
                .addEntity<WordGroup>({ model: 'word_group', entity: group })
                .pipe(
                    map((ret) => {
                        group._id = ret._id;
                        return new wordActions.AddWordGroupSuccess(group);
                    })
                );
        })
    );

    @Effect() addList$: Observable<
        wordActions.AddWordListSuccess | wordActions.UpdateWordListCache
    > = this.actions$.pipe(
        ofType(wordActions.ActionTypes.ADD_WORD_LIST),
        mergeMap(({ payload }) => {
            const list: WordList = payload;
            return this.entityService
                .addEntity<WordList>({ model: 'word_list', entity: list })
                .pipe(
                    mergeMap((ret) => {
                        list._id = ret._id;
                        return [
                            new wordActions.AddWordListSuccess(list),
                            new wordActions.UpdateWordListCache({ groupId: list.group, cache: list })
                        ];
                    })
                );
        })
    );

    @Effect() deleteWord$: Observable<wordActions.DeleteWordSuccess> = this.actions$.pipe(
        ofType(wordActions.ActionTypes.DELETE),
        mergeMap(({ payload }) => {
            const id = payload;
            return this.entityService.deleteEntity({ model: 'word', id }).pipe(
                map((ret) => {
                    return new wordActions.DeleteWordSuccess(id);
                })
            );
        })
    );
}
