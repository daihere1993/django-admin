import { Action } from '@ngrx/store';
import { Word, WordGroup, WordList } from '@definition/word';

export interface UpdateStr<T> {
  id: string;
  changes: Partial<T>;
}

export enum ActionTypes {
  LOAD_WORDS = '[Word/API] Load words',
  LOAD_WORDS_SUCCESS = '[Word/API] Load words success',
  LOAD_WORD_GROUPS = '[Word_group/API] Load group',
  LOAD_WORD_GROUPS_SUCCESS = '[Word_group/API] Load group success',
  LOAD_WORD_LISTS = '[Word_list/API] Load list',
  LOAD_WORD_LISTS_SUCCESS = '[Word_list/API] Load list success',
  UPDATE_WORD_LISTS_CACHE = '[Word_list/Cache] Update',
  ADD = '[Word/API] Add word',
  ADD_SUCCESS = '[Word/API] Add word success',
  EDIT = '[Word/API] Edit word',
  EDIT_SUCCESS = '[Word/API] Edit word success',
  ADD_GROUP = '[Word_group/API] Add group',
  ADD_GROUP_SUCCESS = '[Word_group/API] Add group success',
  ADD_WORD_LIST = '[Word_list/API] Add list',
  ADD_WORD_LIST_SUCCESS = '[Word_list/API] Add list success',
  DELETE = '[Word/API] Delete word',
  DELETE_SUCCESS = '[Word/API] Delete word success',
}

export class LoadWords implements Action {
  readonly type = ActionTypes.LOAD_WORDS;

  constructor(public payload: { groupId: string; listId: string }) {}
}

export class LoadWordsSuccess implements Action {
  readonly type = ActionTypes.LOAD_WORDS_SUCCESS;

  constructor(public payload: Word[]) {}
}

export class LoadWordGroup implements Action {
  readonly type = ActionTypes.LOAD_WORD_GROUPS;
}

export class LoadWordGroupSuccess implements Action {
  readonly type = ActionTypes.LOAD_WORD_GROUPS_SUCCESS;

  constructor(public payload: WordGroup[]) {}
}

export class LoadList implements Action {
  readonly type = ActionTypes.LOAD_WORD_LISTS;

  constructor(public payload: { groupId: string }) {}
}

export class LoadWordListSuccess implements Action {
  readonly type = ActionTypes.LOAD_WORD_LISTS_SUCCESS;

  constructor(public payload: WordList[]) {}
}

export class UpdateWordListCache implements Action {
  readonly type = ActionTypes.UPDATE_WORD_LISTS_CACHE;

  constructor(
    public payload: { cache: WordList[] | WordList; groupId: string },
  ) {}
}

export class AddWord implements Action {
  readonly type = ActionTypes.ADD;

  constructor(public payload: Word) {}
}

export class AddWordSuccess implements Action {
  readonly type = ActionTypes.ADD_SUCCESS;

  constructor(public payload: Word) {}
}

export class EditWord implements Action {
  readonly type = ActionTypes.EDIT;

  constructor(public payload: UpdateStr<Word>) {}
}

export class EditWordSuccess implements Action {
  readonly type = ActionTypes.EDIT_SUCCESS;

  constructor(public payload: UpdateStr<Word>) {}
}

export class AddWordGroup implements Action {
  readonly type = ActionTypes.ADD_GROUP;

  constructor(public payload: WordGroup) {}
}

export class AddWordGroupSuccess implements Action {
  readonly type = ActionTypes.ADD_GROUP_SUCCESS;

  constructor(public payload: WordGroup) {}
}

export class AddWordList implements Action {
  readonly type = ActionTypes.ADD_WORD_LIST;

  constructor(public payload: WordList) {}
}

export class AddWordListSuccess implements Action {
  readonly type = ActionTypes.ADD_WORD_LIST_SUCCESS;

  constructor(public payload: WordList) {}
}

export class DeleteWord implements Action {
  readonly type = ActionTypes.DELETE;

  constructor(public payload: string) {}
}

export class DeleteWordSuccess implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload: string) {}
}

export type ActionsUnion =
  | LoadWordsSuccess
  | LoadWordListSuccess
  | AddWordSuccess
  | LoadWordGroupSuccess
  | UpdateWordListCache
  | DeleteWordSuccess
  | EditWordSuccess
  | AddWordGroupSuccess
  | AddWordListSuccess;
