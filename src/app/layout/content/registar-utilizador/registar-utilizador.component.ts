import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/core/models/cliente';
import { UtilizadorService } from 'src/app/core/services/utilizador/utilizador.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registar-utilizador',
  templateUrl: './registar-utilizador.component.html',
  styleUrls: ['./registar-utilizador.component.css']
})
export class RegistarUtilizadorComponent implements OnInit {

  modo_entrega_rb: String;
  metodo_pagamento_rb: String;

  statusMessage: string;

  constructor(private userSrv: UtilizadorService,
    private route: Router,
    private location: Location) { }

  ngOnInit() {
  }

  radioChangeHandlerModoEntrega(event: any) {
    this.modo_entrega_rb = event.target.value;
  }

  radioChangeHandlerMetodoPagamento(event: any) {
    this.metodo_pagamento_rb = event.target.value;
  }

  registar(nr_idCivil: String, nome: String, email: String, password: String, passwordConf: String, telemovel: String, morada: String, cod_postal: String) {
    if (password !== passwordConf) {
      return alert("Passwords não são iguais");
    }

    this.userSrv.AddUser(new Cliente(nr_idCivil, nome, email, password, telemovel, this.metodo_pagamento_rb, this.modo_entrega_rb, morada, cod_postal))
      .subscribe(
        _ => { this.route.navigate(['/']) },
        error => { this.statusMessage = "Error: Service Unavailable"; }
      );

  }

}
