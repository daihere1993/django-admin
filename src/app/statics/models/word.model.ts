export interface Word {
    _id?: string;
    name?: string;
    group?: any;
    list?: any;
    phonetic?: object;
    description?: string;
}

export interface WordGroup {
    _id?: string;
    name?: string;
    description?: string;
}

export interface WordList {
    _id?: string;
    name?: string;
    group?: string;
    description?: string;
}
