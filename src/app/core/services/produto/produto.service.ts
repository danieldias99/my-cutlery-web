import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { MessageLogService } from '../MessageLog/message-log.service';
import { Produto } from '../../models/produto.model';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  //private WebApiIt1url = 'http://localhost:5000/api/';
  private WebApiIt1url = 'https://azure-mdp.azurewebsites.net/api/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient,
    private messageService: MessageLogService) { }

  /** Log a ProdutoService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`ProdutoService: ${message}`);
  }

  /** GET Produto by id. Will 404 if id not found */
  getProduto(id: number): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'Produto/' + `${id}`).
      pipe(
        tap(_ => this.log(`get Produto id=${id}`)),
        catchError(this.handleError<Produto>(`getProduto id=${id}`)));
  }

  getProdutos(): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'Produto').pipe(
      map(this.extractData));
  }

  /*Post add a new Produto to the database*/
  addProduto(produto: Produto): any {
    return this.httpClient.post(this.WebApiIt1url + 'Produto', produto, this.httpOptions).pipe(
      tap(_ => this.log(`Post Produto`)),
      catchError(this.handleError<Produto>("addProduto")));
  }

  /** PUT: update the Produto on the server */
  updateProduto(Produto: Produto): Observable<any> {
    return this.httpClient.put(this.WebApiIt1url + 'Produto', Produto).pipe(
      tap(_ => this.log(`Update Produto`)),
      catchError(this.handleError<Produto>('updateProduto'))
    );
  }

  /** DELETE: delete the Produto from the server */
  deleteProduto(id: string): Observable<any> {
    return this.httpClient.delete(this.WebApiIt1url + 'Produto/' + `${id}`).pipe(
      tap(_ => this.log(`deleted Produto id` + id)),
      catchError(this.handleError('deleteProduto'))
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
