import { _HttpResponsebase, Filter } from './ajax';

export interface _EntityParamsBase {
    model: string;
    retFields?: string[];
}
// GetEntity interfaces
export interface GetEntityParams extends _EntityParamsBase {
    id: number;
}
export interface GetEntityResponse<M> extends _HttpResponsebase {
    entity: M;
}
// GetEntities interfaces
export interface GetEntitiesParams extends _EntityParamsBase {
    ids?: string[];
    filter?: Filter | Filter[];
}
export interface GetEntitiesResponse<M> extends _HttpResponsebase {
    entities: M[];
}
// AddEntity interfaces
export interface AddEntityParams<M> extends _EntityParamsBase {
    entity: M;
}
export interface AddEntityResponse<M> extends _HttpResponsebase {
    _id: string;
    value: M;
}
// AddEntities interfaces
export interface AddEntitiesParams<M> extends _EntityParamsBase {
    entities: M[];
}
export interface AddEntitiesResponse<M> extends _HttpResponsebase {
    _ids: string[];
}
// UpdateEntity interfaces
export interface UpdateEntityParams<M> extends _EntityParamsBase {
    id: string;
    value: M;
}
export interface UpdateEntityResponse<M> extends _HttpResponsebase {
    value: M;
}
// UpdateEntities interfaces
export interface UpdateEntitiesParams<M> extends _EntityParamsBase {
    value: M | M[];
    filter?: Filter;
}
export interface UpdateEntitiesResponse<M> extends _HttpResponsebase {
    entities: M[];
}
// DeleteEntity interfaces
export interface DeleteEntityParams extends _EntityParamsBase {
    id: string;
}
export interface DeleteEntityResponse extends _HttpResponsebase {
    _id: string;
}
// DeleteEntities interfaces
export interface DeleteEntitiesParams extends _EntityParamsBase {
    ids?: string[];
    filter?: Filter;
}
export interface DeleteEntitiesResponse extends _HttpResponsebase {
    _ids: string[];
}
