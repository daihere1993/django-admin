import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Word, WordGroup, WordList } from '@statics/models/word.model';
import * as wordActions from './word.action';
import * as _ from 'lodash';

export interface CacheState<T> {
    [key: string]: T[];
}

export interface WordState extends EntityState<Word> {}
export interface WordGroupState extends EntityState<WordGroup> {}
export interface WordListState extends EntityState<WordList> {
    caches: CacheState<WordList>;
}

export const wordAdapter: EntityAdapter<Word> = createEntityAdapter<Word>({
    selectId: (model: Word) => model._id
});
export const groupAdapter: EntityAdapter<WordGroup> = createEntityAdapter<WordGroup>({
    selectId: (model: WordGroup) => model._id
});
export const listAdapter: EntityAdapter<WordList> = createEntityAdapter<WordList>({
    selectId: (model: WordList) => model._id
});

export const defaultWord: WordState = {
    ids: [],
    entities: {}
};
export const defaultGroup: WordGroupState = {
    ids: [],
    entities: {}
};
export const defaultList: WordListState = {
    ids: [],
    entities: {},
    caches: {}
};

export const initialWordState = wordAdapter.getInitialState(defaultWord);
export const initialGroupState = wordAdapter.getInitialState(defaultGroup);
export const initialListState = wordAdapter.getInitialState(defaultList);

export function wordReducer(state = initialWordState, action: wordActions.ActionsUnion): WordState {
    switch (action.type) {
        case wordActions.ActionTypes.LOAD_WORDS_SUCCESS:
            return wordAdapter.addAll(action.payload, state);
        case wordActions.ActionTypes.ADD_SUCCESS:
            return wordAdapter.addOne(action.payload, state);
        case wordActions.ActionTypes.EDIT_SUCCESS:
            return wordAdapter.updateOne(action.payload, state);
        case wordActions.ActionTypes.DELETE_SUCCESS:
            return wordAdapter.removeOne(action.payload, state);
        default:
            return state;
    }
}

export function wordGroupReducer(state = initialGroupState, action: wordActions.ActionsUnion): WordGroupState {
    switch (action.type) {
        case wordActions.ActionTypes.LOAD_WORD_GROUPS_SUCCESS:
            return groupAdapter.addAll(action.payload, state);
        case wordActions.ActionTypes.ADD_GROUP_SUCCESS:
            return groupAdapter.addOne(action.payload, state);
        default:
            return state;
    }
}

export function wordListReducer(state = initialListState, action: wordActions.ActionsUnion): WordListState {
    switch (action.type) {
        case wordActions.ActionTypes.LOAD_WORD_LISTS_SUCCESS:
            return listAdapter.addAll(action.payload, state);
        case wordActions.ActionTypes.ADD_WORD_LIST_SUCCESS:
            return listAdapter.addOne(action.payload, state);
        case wordActions.ActionTypes.UPDATE_WORD_LISTS_CACHE:
            const cache = action.payload.cache;
            if (_.isArray(cache)) {
                state.caches[action.payload.groupId] = cache;
            } else {
                state.caches[action.payload.groupId].push(cache);
            }
            return state;
        default:
            return state;
    }
}

export const wordSelector = createFeatureSelector<WordState>('word');
export const groupSelector = createFeatureSelector<WordGroupState>('word_group');
export const listSelector = createFeatureSelector<WordListState>('word_list');
export const selectAllWords = createSelector(wordSelector, wordAdapter.getSelectors().selectAll);
export const selectAllWordGroups = createSelector(groupSelector, groupAdapter.getSelectors().selectAll);
export const selectAllWordLists = createSelector(listSelector, listAdapter.getSelectors().selectAll);
