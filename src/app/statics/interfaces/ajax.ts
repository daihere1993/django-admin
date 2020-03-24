/**
 * EQ: equal
 * GE: more than
 * GEE: more thn & equal
 * LT: less than
 * LTE: less than & equal
 */
export type AjaxFilter = 'EQ' | 'GE' | 'GEE' | 'LT' | 'LTE';

export interface Filter {
    field: string;
    match: AjaxFilter;
    value: any;
}

export enum HttpResponseStatus {
    SUCCESS,
    FAIL
}

export interface _HttpResponsebase {
    ok: number;
}
