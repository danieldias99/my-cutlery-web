import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { MessageLogService } from '../MessageLog/message-log.service';
import { LinhaProducao } from '../../models/linha-producao';

@Injectable({
  providedIn: 'root'
})
export class LinhaProducaoService {

  private WebApiIt1url = 'http://localhost:5000/api/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient,
    private messageService: MessageLogService) { }

  /** Log a LinhaProducaoService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`LinhaProducaoService: ${message}`);
  }

  /** GET LinhaProducao by Id. Will 404 if Id not found */
  getLinhaProducao(Id: number): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'LinhaProducao/' + `${Id}`).
      pipe(tap(_ => this.log(`get LinhaProducao Id=${Id}`)),
        catchError(this.handleError<LinhaProducao>(`getLinhaProducao Id=${Id}`)));
  }

  getLinhasProducao(): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'LinhaProducao').pipe(map(this.extractData),
      catchError(this.handleError<LinhaProducao>(`getLinhasProducao`)));
  }

  /*Post add a new LinhaProducao to the database*/
  addLinhaProducao(LinhaProducao: LinhaProducao): any {
    return this.httpClient.post(this.WebApiIt1url + 'LinhaProducao', LinhaProducao, this.httpOptions).pipe(
      tap(_ => this.log(`get LinhaProducao Id=${LinhaProducao.id}`)),
      catchError(this.handleError<LinhaProducao>("addOpercao")));
  }

  /** PUT: update the LinhaProducao on the server */
  updateLinhaProducao(LinhaProducao: LinhaProducao): Observable<any> {
    return this.httpClient.put(this.WebApiIt1url + 'LinhaProducao', LinhaProducao, this.httpOptions).pipe(
      tap(_ => this.log(`updated LinhaProducao Id=${LinhaProducao.id}`)),
      catchError(this.handleError<LinhaProducao>('updateLinhaProducao'))
    );
  }

  /** DELETE: delete the LinhaProducao from the server */
  deleteLinhaProducao(Id: string): Observable<any> {
    return this.httpClient.delete(this.WebApiIt1url + 'LinhaProducao/' + `${Id}`, this.httpOptions).pipe(
      tap(_ => this.log(`deleted LinhaProducao Id` + Id)),
      catchError(this.handleError('deleteLinhaProducao'))
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

