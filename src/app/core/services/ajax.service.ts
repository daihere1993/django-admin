import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import backendConf from '@statics/configs';
import { _EntityParamsBase } from '@app/statics/interfaces/entity';

@Injectable({
  providedIn: 'root',
})
export default class AjaxService {
  private get headers(): HttpHeaders {
    return (
      this.headers ||
      new HttpHeaders({
        'Content-Type': 'application/json',
      })
    );
  }

  private serverAddr: string;

  constructor(private http: HttpClient) {
    this.serverAddr = `${backendConf.server}:${backendConf.port}`;
  }

  public call<P extends _EntityParamsBase>(
    method: string,
    service: string,
    params: P,
  ): Observable<any> {
    const url = [this.serverAddr, service, method].join('/');
    const body = JSON.stringify(params);
    const _headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, body, { headers: _headers });
  }
}
