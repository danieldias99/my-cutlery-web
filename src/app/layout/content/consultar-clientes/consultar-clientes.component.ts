import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/core/models/cliente';
import { UtilizadorService } from 'src/app/core/services/utilizador/utilizador.service';

@Component({
  selector: 'app-consultar-clientes',
  templateUrl: './consultar-clientes.component.html',
  styleUrls: ['./consultar-clientes.component.css']
})
export class ConsultarClientesComponent implements OnInit {

  allClientes: Cliente[];

  allClientesFilter: Cliente[];

  statusMessage: string;

  constructor(private utilizadoSrv: UtilizadorService) { }

  ngOnInit() {
    this.fetchClientes();
  }

  fetchClientes() {
    this.utilizadoSrv.getAllUsers().subscribe(data => { this.allClientes = data; console.log(data); this.allClientesFilter = this.allClientes; },
      error => { this.statusMessage = 'Service Unavailable' });
  }

  filter(seach) {
    this.allClientesFilter = this.allClientes;
    this.allClientesFilter = this.allClientes.filter(c => c.nome.toLowerCase().includes(seach));
    console.log(this.allClientesFilter);
  }
}
