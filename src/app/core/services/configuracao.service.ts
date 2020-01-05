import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MessageLogService } from './MessageLog/message-log.service';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoService {

  private WebApiIt1url = 'https://whispering-bayou-26917.herokuapp.com/api/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient,
    private messageService: MessageLogService) { }

  /** Log a EncomendasService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`EncomendasService: ${message}`);
  }

  fetchEncomendas(): Observable<any> {
    var jsonBody: {} = {
      token: localStorage.getItem('Token')
    }
    return this.httpClient.post(this.WebApiIt1url + 'config/fetchConf', jsonBody).
      pipe(tap(_ => this.log(`fetch Encomendas`)),
        catchError(this.handleError<any>(`fetch Encomendas`)));
  }

  addEncomendas(role: string, resources: String[], permissions: String[]): Observable<any> {
    var jsonBody: {} = {
      token: localStorage.getItem('Token'),
      role: role,
      resources: resources,
      permissons: permissions
    }
    return this.httpClient.post(this.WebApiIt1url + 'config/addConf', jsonBody).
      pipe(tap(_ => this.log(`fetch Encomendas`)),
        catchError(this.handleError<any>(`fetch Encomendas`)));
  }

  remEncomendas(role: string, resources: String[], permissions: String[]): Observable<any> {
    var jsonBody: {} = {
      token: localStorage.getItem('Token'),
      role: role,
      resources: resources,
      permissons: permissions
    }
    return this.httpClient.post(this.WebApiIt1url + 'config/remConf', jsonBody).
      pipe(tap(_ => this.log(`fetch Encomendas`)),
        catchError(this.handleError<any>(`fetch Encomendas`)));
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.statusText}`);

      // Let the app keep running by returning an empty result.
      return;
    };
  }
}
