import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { UtilizadorService } from 'src/app/core/services/utilizador/utilizador.service';
import { Cliente } from 'src/app/core/models/cliente';
import { EncomendaService } from 'src/app/core/services/encomenda/encomenda.service';
import { Encomenda } from 'src/app/core/models/encomenda';


@Component({
  selector: 'app-sessao',
  templateUrl: './sessao.component.html',
  styleUrls: ['./sessao.component.css']
})
export class SessaoComponent implements OnInit {

  @Input() currentUser: Cliente;

  @Input() admin: Boolean = false;

  encomendas: Encomenda[];

  encomendasFilter: Encomenda[];

  constructor(private utilizadorSrv: UtilizadorService,
    private encomendaSrv: EncomendaService,
    private router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.utilizadorSrv.getUser()
      .subscribe(utilizadorResult => {
        this.currentUser = utilizadorResult;
        if (this.currentUser.isAdmin) {
          this.admin = true;
          this.getEncomendas();
        } else {
          this.getEncomendasByCliente();
          this.admin = false;
        }
        console.log(utilizadorResult);
      },
        error => "Update Service Unavailable");
  }

  getEncomendasByCliente() {
    this.encomendaSrv.getEncomendasByUser()
      .subscribe(encomendasResult => {
        this.encomendas = encomendasResult;
        this.encomendasFilter = encomendasResult;
        console.log(encomendasResult);
      },
        error => "Update Service Unavailable");
  }

  getEncomendas() {
    this.encomendaSrv.getEncomendas()
      .subscribe(encomendasResult => {
        this.encomendas = encomendasResult;
        this.encomendasFilter = encomendasResult;
        console.log(encomendasResult);
      },
        error => "Update Service Unavailable");
  }

  newEncomenda() {
    this.router.navigate(['/encomenda']);
  }

  cancelar(encomenda: Encomenda) {
    if (this.currentUser.isAdmin) {
      this.encomendaSrv.cancelar(encomenda._id).subscribe(_ => {
        this.getEncomendas();
      },
        error => "Update Service Unavailable");
    } else {
      this.encomendaSrv.pedidoCancelar(encomenda._id).subscribe(_ => {
        this.getEncomendasByCliente();
      },
        error => "Update Service Unavailable");
    }
  }

  update(encomenda: Encomenda) {
    this.router.navigate(['/encomenda-detail/' + encomenda._id]);
  }

  filtrarEncomendas(toFilter: string) {
    this.encomendasFilter = this.encomendas;
    this.encomendasFilter = this.encomendas.filter(c => c.cliente.toLowerCase().includes(toFilter));
  }

}
