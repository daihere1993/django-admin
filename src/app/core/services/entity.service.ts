import AjaxService from '@services/ajax.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  GetEntityParams,
  GetEntitiesParams,
  AddEntityParams,
  AddEntitiesParams,
  UpdateEntityParams,
  UpdateEntityResponse,
  UpdateEntitiesParams,
  UpdateEntitiesResponse,
  GetEntityResponse,
  GetEntitiesResponse,
  AddEntityResponse,
  AddEntitiesResponse,
  DeleteEntityParams,
  DeleteEntitiesParams,
  DeleteEntityResponse,
  DeleteEntitiesResponse,
} from '@app/statics/interfaces/entity';

const DEFAULT_ENTITY_SERVICE = 'entityService';

@Injectable({
  providedIn: 'root',
})
export default class EntityService {
  constructor(private ajax: AjaxService) {}

  public getEntity<M>(
    params: GetEntityParams,
  ): Observable<GetEntityResponse<M>> {
    return this.ajax.call<GetEntityParams>(
      'getEntity',
      DEFAULT_ENTITY_SERVICE,
      params,
    );
  }

  public getEntities<M>(
    params: GetEntitiesParams,
  ): Observable<GetEntitiesResponse<M>> {
    return this.ajax.call('getEntities', DEFAULT_ENTITY_SERVICE, params);
  }

  public addEntity<M>(
    params: AddEntityParams<M>,
  ): Observable<AddEntityResponse<M>> {
    return this.ajax.call('addEntity', DEFAULT_ENTITY_SERVICE, params);
  }

  public addEntities<M>(
    params: AddEntitiesParams<M>,
  ): Observable<AddEntitiesResponse<M>> {
    return this.ajax.call('addEntity', DEFAULT_ENTITY_SERVICE, params);
  }

  public updateEntity<M>(
    params: UpdateEntityParams<M>,
  ): Observable<UpdateEntityResponse<M>> {
    return this.ajax.call('updateEntity', DEFAULT_ENTITY_SERVICE, params);
  }

  public updateEntities<M>(
    params: UpdateEntitiesParams<M>,
  ): Observable<UpdateEntitiesResponse<M>> {
    return this.ajax.call('updateEntities', DEFAULT_ENTITY_SERVICE, params);
  }

  public deleteEntity(
    params: DeleteEntityParams,
  ): Observable<DeleteEntityResponse> {
    return this.ajax.call('deleteEntity', DEFAULT_ENTITY_SERVICE, params);
  }

  public deleteEntities(
    params: DeleteEntitiesParams,
  ): Observable<DeleteEntitiesResponse> {
    return this.ajax.call('deleteEntities', DEFAULT_ENTITY_SERVICE, params);
  }
}
