import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Operacao } from '../../models/operacao.model';
import { MessageLogService } from '../MessageLog/message-log.service';


@Injectable({
  providedIn: 'root'
})
export class OperacaoService {

  private WebApiIt1url = 'http://localhost:5000/api/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient,
    private messageService: MessageLogService) { }

  /** Log a OperacaoService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`OperacaoService: ${message}`);
  }

  /** GET operacao by id. Will 404 if id not found */
  getOperacao(id: number): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'Operacao/' + `${id}`).
      pipe(
        tap(_ => this.log(`get operacao id=${id}`)),
        catchError(this.handleError<Operacao>(`getOperacao id=${id}`)));
  }

  getOperacoes(): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'Operacao').pipe(
      map(this.extractData));
  }

  /*Post add a new Operacao to the database*/
  addOperacao(operacao: Operacao): any {
    return this.httpClient.post(this.WebApiIt1url + 'Operacao', operacao, this.httpOptions).pipe(
      tap(_ => this.log(`get operacao id=${operacao.Id}`)),
      catchError(this.handleError<Operacao>("addOpercao")));
  }

  /** PUT: update the Operacao on the server */
  updateOperacao(operacao: Operacao): Observable<any> {
    return this.httpClient.put(this.WebApiIt1url + 'Operacao' , operacao, this.httpOptions).pipe(
      tap(_ => this.log(`updated operacao id=${operacao.Id}`)),
      catchError(this.handleError<Operacao>('updateOperacao'))
    );
  }

  /** DELETE: delete the operacao from the server */
  deleteOperacao(id: string): Observable<any> {
    return this.httpClient.delete(this.WebApiIt1url + 'Operacao/' + `${id}`, this.httpOptions).pipe(
      tap(_ => this.log(`deleted operacao id` + id)),
      catchError(this.handleError('deleteOperacao'))
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
