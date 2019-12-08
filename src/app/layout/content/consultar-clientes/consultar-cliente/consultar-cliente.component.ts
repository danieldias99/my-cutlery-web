import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from 'src/app/core/models/cliente';
import { UtilizadorService } from 'src/app/core/services/utilizador/utilizador.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-consultar-cliente',
  templateUrl: './consultar-cliente.component.html',
  styleUrls: ['./consultar-cliente.component.css']
})
export class ConsultarClienteComponent implements OnInit {

  @Input() cliente: Cliente;

  constructor(private route: ActivatedRoute,
    private clienteSrv: UtilizadorService,
    private location: Location) { }

  ngOnInit() {
    this.fetchCliente();
  }

  fetchCliente() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.clienteSrv.getUser(id)
      .subscribe(clienteResult => { this.cliente = clienteResult[0]; console.log(this.cliente); },
        error => "Update Service Unavailable");
  }

  goBack(): void {
    this.location.back();
  }
}
