import { Component, OnInit, Input } from '@angular/core';
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

  @Input() cliente: Cliente = null;

  newNomeEmptyFlag: boolean = false;

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
  }

  validarNomeEmpty(newNome: String) {
    if (newNome === '') {
      this.newNomeEmptyFlag = true;
      return
    }
    this.newNomeEmptyFlag = false;
  }

  edit(cliente: Cliente) {
    this.cliente = cliente;
  }

  save(newNome: String, newEmail: String) {
    if (newEmail === '' || newEmail === null) {
      newEmail = this.cliente.email;
    }

    this.utilizadoSrv.update(newNome, newEmail, this.cliente.email)
      .subscribe(_ => {
        this.fetchClientes();
        this.cliente === null;
        alert("Cliente atualizado com sucesso!");
      },
        error => { this.statusMessage = 'Service Unavailable' });;
  }

}
