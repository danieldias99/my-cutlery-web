import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { MessageLogService } from '../MessageLog/message-log.service';
import { Cliente } from '../../models/cliente';
import { Observable } from 'rxjs';
import { Utilizador } from '../../models/utilizador';
import { EncriptPackage } from '../../models/EncriptPackage';

@Injectable({
  providedIn: 'root'
})
export class UtilizadorService {

  private WebApiIt1url = 'http://localhost:5000/api/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('Token')
    })
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
    var jsonBody: {} = {
      token: localStorage.getItem('Token')
    }
    return this.httpClient.post(this.WebApiIt1url + 'cliente/getUsers', jsonBody).pipe(map(this.extractData),
      catchError(this.handleError<Cliente>(`getTiposMaquina`)));
  }

  /** GET LinhaProducao by n_idCivil. Will 404 if n_idCivil not found */
  getUser(): Observable<any> {
    var jsonBody: {} = {
      token: localStorage.getItem('Token')
    }
    return this.httpClient.post(this.WebApiIt1url + `cliente/getUser`, jsonBody).
      pipe(tap(_ => this.log(`get LinhaProducao n_idCivil=`)),
        catchError(this.handleError<Utilizador>(`getLinhaProducao n_idCivil=`)));
  }

  signIn(encript: EncriptPackage): any {
    return this.httpClient.post(this.WebApiIt1url + 'cliente/signIn', encript)
      .pipe(tap(_ => this.log('signIn of user with email=' + `${encript.email}`)),
        catchError(this.handleError<Utilizador>('signIn of user with email=' + `${encript.email}`)));
  }

  update(nomeup: String, emailup: String, emailToSeach: String) {
    var jsonBody: {} = {
      token: localStorage.getItem('Token'),
      oldEmail: emailToSeach,
      nomeNew: nomeup,
      emailNew: emailup
    }
    return this.httpClient.patch(this.WebApiIt1url + 'cliente/updateCliente', jsonBody)
      .pipe(tap(_ => this.log('update of user with email=' + `${emailup}`)),
        catchError(this.handleError<Utilizador>('update of user with email=' + `${emailup}`)));
  }

  updateSelf(nomeup: String, emailup: String) {
    var jsonBody: {} = {
      token: localStorage.getItem('Token'),
      nomeNew: nomeup,
      emailNew: emailup
    }
    return this.httpClient.patch(this.WebApiIt1url + 'cliente', jsonBody)
      .pipe(tap(_ => this.log('update of user with email=' + `${emailup}`)),
        catchError(this.handleError<Utilizador>('update of user with email=' + `${emailup}`)));
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
      console.log(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.statusText}`);

      // Let the app keep running by returning an empty result.
      return;
    };
  }

}
