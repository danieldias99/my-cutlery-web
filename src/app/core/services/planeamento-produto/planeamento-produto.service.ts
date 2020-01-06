import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { MessageLogService } from '../MessageLog/message-log.service';

@Injectable({
  providedIn: 'root'
})
export class PlaneamentoProdutoService {

  private WebApiIt1url = 'http://localhost:5000/';

  constructor(private httpClient: HttpClient,
    private messageService: MessageLogService) { }

  /** Log a EncomendasService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`EncomendasService: ${message}`);
  }

  getPlaneamentoProduto(): Observable<any> {
    return this.httpClient.post(this.WebApiIt1url + 'exporta', '').
      pipe(tap(_ => this.log(`get Planeamento Produto`)),
        catchError(this.handleError<any>(`get Planeamento Produto`)));
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
