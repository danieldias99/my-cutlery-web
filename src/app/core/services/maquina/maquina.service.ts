import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { MessageLogService } from '../MessageLog/message-log.service';
import { Maquina } from '../../models/maquina.model';

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {

  //private WebApiIt1url = 'http://localhost:5000/api/';
  private WebApiIt1url = 'https://mdf-azure.azurewebsites.net/api/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient,
    private messageService: MessageLogService) { }

    /** Log a MaquinaService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`MaquinaService: ${message}`);
  }

  /** GET Maquina by id. Will 404 if id not found */
  getMaquina(id: number): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'Maquina/' + `${id}`).
      pipe(tap(_ => this.log(`get Maquina id=${id}`)),
        catchError(this.handleError<Maquina>(`getMaquina id=${id}`)));
  }

  getMaquinas(): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'Maquina').pipe(map(this.extractData),
      catchError(this.handleError<Maquina>(`getTiposMaquina`)));
  }

  /*Post add a new Maquina to the database*/
  addMaquina(Maquina: Maquina): any {
    return this.httpClient.post(this.WebApiIt1url + 'Maquina', Maquina, this.httpOptions).pipe(
      tap(_ => this.log(`get Maquina id=${Maquina.id}`)),
      catchError(this.handleError<Maquina>("addOpercao")));
  }

  /** PUT: update the Maquina on the server */
  updateMaquina(Maquina: Maquina): Observable<any> {
    return this.httpClient.put(this.WebApiIt1url + 'Maquina', Maquina, this.httpOptions).pipe(
      tap(_ => this.log(`updated Maquina id=${Maquina.id}`)),
      catchError(this.handleError<Maquina>('updateMaquina'))
    );
  }

  /** DELETE: delete the Maquina from the server */
  deleteMaquina(id: number): Observable<any> {
    return this.httpClient.delete(this.WebApiIt1url + 'Maquina/' + `${id}`, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Maquina id` + id)),
      catchError(this.handleError('deleteMaquina'))
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

