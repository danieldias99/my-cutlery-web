import { Component, OnInit, Input } from '@angular/core';
import { UtilizadorService } from 'src/app/core/services/utilizador/utilizador.service';
import { Cliente } from 'src/app/core/models/cliente';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  company_name = 'MyOwnCutlery';

  @Input() cliente: Cliente;

  constructor(private clienteSrv: UtilizadorService) { }

  ngOnInit() {
    //this.fetchCurrentUser();
  }

  fetchCurrentUser() {
    this.clienteSrv.getUser()
      .subscribe(clienteResult => {
        this.cliente = clienteResult;
        console.log(this.cliente);
      },
        error => "Update Service Unavailable");
  }

  logout() {
    localStorage.clear();
  }

}
