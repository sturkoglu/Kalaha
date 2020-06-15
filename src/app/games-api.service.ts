import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, share } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpHeaders, HttpEvent } from '@angular/common/http';

import { ErrorMessage } from './shared/error-message';
import { Board } from './shared/board';

@Injectable()
export class GamesApiService {

  constructor(private http: HttpClient) { }

  start(body: string): Observable<Board> {
    const options = GamesApiService.getOptions();
    return GamesApiService
      .resolve(() => this.http.post<Board>(`http://localhost:8080/kalaha/start/`, body , options));
  }

  move(body: string): Observable<Board> {
    const options = GamesApiService.getOptions();
    return GamesApiService
      .resolve(() => this.http.put<Board>(`http://localhost:8080/kalaha/move/`, body , options));
  }

  get(boardId: number): Observable<Board> {
    const options = GamesApiService.getOptions();
    return GamesApiService
      .resolve(() => this.http.get<Board>(`http://localhost:8080/kalaha/board/` + boardId , options));
  }

  private static getOptions(body?: any, contentType = 'application/json', accept = 'application/json')
    : any {
    return {
      headers: new HttpHeaders({
        'Accept': accept,
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
        'If-Modified-Since': '0'
      }),
      withCredentials: true,
      body: body ? body : null
    };
  }

  private static extractData(res: HttpResponse<any>) {
    if (res && typeof res === 'object' && !res.body) {
      return res;
    }
    return  res && res.body.text().length > 0 ? res.body.json() : {};
  }

  private static handleError(error: HttpResponse<any> | any) {
    if (!(error instanceof HttpResponse)) {
      const errMsg: ErrorMessage = error.message
        ? error.message
        : error.toString();
      return throwError(errMsg);
    }

    switch (error.status) {
      case 0:
        return throwError({
          code: error.status,
          source: error.url,
          message: `Cannot reach server.`
        });
      default:
        return throwError({
          code: error.status,
          source: error.url,
          message: error.statusText,
          body: error['_body']
        });
    }
  }

  private static resolve(request: () => Observable<HttpEvent<any>>): Observable<any> {
    return request()
      .pipe(
        share(),
        map(GamesApiService.extractData),
        catchError(GamesApiService.handleError)
      );
  }
}
