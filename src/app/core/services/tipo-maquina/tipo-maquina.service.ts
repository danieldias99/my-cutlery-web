import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { MessageLogService } from '../MessageLog/message-log.service';
import { TipoMaquina } from '../../models/tipo-maquina.model';

@Injectable({
  providedIn: 'root'
})
export class TipoMaquinaService {

  //private WebApiIt1url = 'http://localhost:5000/api/';
  private WebApiIt1url = 'https://mdf-azure.azurewebsites.net/api/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient,
    private messageService: MessageLogService) { }

  /** Log a TipoMaquinaService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`TipoMaquinaService: ${message}`);
  }

  /** GET TipoMaquina by id. Will 404 if id not found */
  getTipoMaquina(id: number): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'TipoMaquina/' + `${id}`).
      pipe(tap(_ => this.log(`get TipoMaquina id=${id}`)),
        catchError(this.handleError<TipoMaquina>(`getTipoMaquina id=${id}`)));
  }

  getTiposMaquina(): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'TipoMaquina').pipe(map(this.extractData),
      catchError(this.handleError<TipoMaquina>(`getTiposMaquina`)));
  }

  /*Post add a new TipoMaquina to the database*/
  addTipoMaquina(TipoMaquina: TipoMaquina): any {
    return this.httpClient.post(this.WebApiIt1url + 'TipoMaquina', TipoMaquina, this.httpOptions).pipe(
      tap(_ => this.log(`get TipoMaquina id=${TipoMaquina.id_tipoMaquina}`)),
      catchError(this.handleError<TipoMaquina>("addOpercao")));
  }

  /** PUT: update the TipoMaquina on the server */
  updateTipoMaquina(TipoMaquina: TipoMaquina): Observable<any> {
    return this.httpClient.put(this.WebApiIt1url + 'TipoMaquina', TipoMaquina, this.httpOptions).pipe(
      tap(_ => this.log(`updated TipoMaquina id=${TipoMaquina.id_tipoMaquina}`)),
      catchError(this.handleError<TipoMaquina>('updateTipoMaquina'))
    );
  }

  /** DELETE: delete the TipoMaquina from the server */
  deleteTipoMaquina(id: string): Observable<any> {
    return this.httpClient.delete(this.WebApiIt1url + 'TipoMaquina/' + `${id}`, this.httpOptions).pipe(
      tap(_ => this.log(`deleted TipoMaquina id` + id)),
      catchError(this.handleError('deleteTipoMaquina'))
    );
  }

  private extractData(res: Response) {
    return res || {};
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

