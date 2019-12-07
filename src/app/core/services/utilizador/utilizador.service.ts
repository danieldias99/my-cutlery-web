import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { MessageLogService } from '../MessageLog/message-log.service';
import { Cliente } from '../../models/cliente';
import { Observable } from 'rxjs';
import { Utilizador } from '../../models/utilizador';

@Injectable({
  providedIn: 'root'
})
export class UtilizadorService {

  private WebApiIt1url = 'http://localhost:8000/api/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient,
    private messageService: MessageLogService) { }

  /** Log a UtlizadorService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`UtlizadorService: ${message}`);
  }

  AddUser(cliente: Cliente) {
    return this.httpClient.post(this.WebApiIt1url + 'cliente', cliente, this.httpOptions).pipe(
      tap(_ => this.log(`post cliente Id=${cliente.nome}`)),
      catchError(this.handleError<Cliente>("AddUser")));
  }

  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'cliente').pipe(map(this.extractData),
      catchError(this.handleError<Cliente>(`getTiposMaquina`)));
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
