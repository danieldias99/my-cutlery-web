import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { MessageLogService } from '../MessageLog/message-log.service';
import { Encomenda } from '../../models/encomenda';
import { ProdutoEncomenda } from '../../models/produto-encomenda';

@Injectable({
  providedIn: 'root'
})
export class EncomendaService {

  //private WebApiIt1url = 'http://localhost:5000/api/';
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

  /** GET Encomendas */
  getEncomendas(): Observable<any> {
    var jsonBody: {} = {
      token: localStorage.getItem('Token')
    }
    return this.httpClient.post(this.WebApiIt1url + 'encomenda/getEncomendas', jsonBody).
      pipe(tap(_ => this.log(`get Encomendas`)),
        catchError(this.handleError<Encomenda>(`getEncomendas`)));
  }

  maisEncomendado(): Observable<any> {
    var jsonBody: {} = {
      token: localStorage.getItem('Token')
    }
    return this.httpClient.post(this.WebApiIt1url + 'encomenda/produtosMaisEncomendados', jsonBody).
      pipe(tap(_ => this.log(`get Produtos Mais Encomendados`)),
        catchError(this.handleError<Encomenda>(`get Produtos Mais Encomendados`)));
  }

  maisVezesEncomendado(): Observable<any> {
    var jsonBody: {} = {
      token: localStorage.getItem('Token')
    }
    return this.httpClient.post(this.WebApiIt1url + 'encomenda/produtosMaisVezesEncomendados', jsonBody).
      pipe(tap(_ => this.log(`get Produtos Mais Encomendados`)),
        catchError(this.handleError<Encomenda>(`get Produtos Mais Encomendados`)));
  }

  menorTempoProducao(): Observable<any> {
    var jsonBody: {} = {
      token: localStorage.getItem('Token')
    }
    return this.httpClient.post(this.WebApiIt1url + 'encomenda/produtosMenorTempoProducao', jsonBody).
      pipe(tap(_ => this.log(`get Produtos Mais Encomendados`)),
        catchError(this.handleError<Encomenda>(`get Produtos Mais Encomendados`)));
  }

  /** GET Encomendas by User. Will 404 if User not found */
  getEncomendasByUser(): Observable<any> {
    var jsonBody: {} = {
      token: localStorage.getItem('Token')
    }
    return this.httpClient.post(this.WebApiIt1url + 'encomenda/getEncomendasCliente', jsonBody).
      pipe(tap(_ => this.log(`get Encomendas By User`)),
        catchError(this.handleError<Encomenda>(`get Encomendas By User`)));
  }

  getEncomenda(id: String): Observable<any> {
    var jsonBody: {} = {
      token: localStorage.getItem('Token'),
      _id: id
    }
    console.log(jsonBody);
    return this.httpClient.post(this.WebApiIt1url + 'encomenda/getEncomenda', jsonBody).
      pipe(tap(_ => this.log(`get Encomendas By User`)),
        catchError(this.handleError<Encomenda>(`get Encomendas By User`)));
  }

  addEncomenda(produtosEncomenda: ProdutoEncomenda[], data_entrega: String) {
    var jsonBody: {} = {
      token: localStorage.getItem('Token'),
      produtos: produtosEncomenda,
      data_entrega: data_entrega
    }
    return this.httpClient.post(this.WebApiIt1url + 'encomenda', jsonBody).
      pipe(tap(_ => this.log(`post Encomenda`)),
        catchError(this.handleError<Encomenda>(`post Encomendas`)));
  }

  pedidoCancelar(id: String) {
    var jsonBody: {} = {
      token: localStorage.getItem('Token'),
      _id: id
    }
    return this.httpClient.patch(this.WebApiIt1url + 'encomenda/pedido-cancelar', jsonBody).
      pipe(tap(_ => this.log(`pedido cancelar Encomenda`)),
        catchError(this.handleError<Encomenda>(`pedido cancelar Encomendas`)));
  }

  cancelar(id: String) {
    var jsonBody: {} = {
      token: localStorage.getItem('Token'),
      _id: id
    }
    return this.httpClient.patch(this.WebApiIt1url + 'encomenda/cancelar', jsonBody).
      pipe(tap(_ => this.log(`cancelar Encomenda`)),
        catchError(this.handleError<Encomenda>(`cancelar Encomendas`)));
  }

  updateEncomenda(encomenda: Encomenda) {
    var jsonBody: {} = {
      token: localStorage.getItem('Token'),
      _id: encomenda._id,
      produtos: encomenda.produtos,
      estado: encomenda.estado,
      data_entrega: encomenda.data_entrega
    }
    return this.httpClient.patch(this.WebApiIt1url + 'encomenda/alterar', jsonBody).
      pipe(tap(_ => this.log(`patch Encomenda`)),
        catchError(this.handleError<Encomenda>(`patch Encomendas`)));
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
