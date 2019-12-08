import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Utilizador } from 'src/app/core/models/utilizador';
import { UtilizadorService } from 'src/app/core/services/utilizador/utilizador.service';
import { Cliente } from 'src/app/core/models/cliente';

@Component({
  selector: 'app-sessao',
  templateUrl: './sessao.component.html',
  styleUrls: ['./sessao.component.css']
})
export class SessaoComponent implements OnInit {

  @Input() currentUser: Cliente;

  constructor(private utilizadorSrv: UtilizadorService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    const nr_idCivil = +this.route.snapshot.paramMap.get('id');
    this.utilizadorSrv.getUser(nr_idCivil)
      .subscribe(utilizadorResult => {
        this.currentUser = utilizadorResult[0];
        console.log(utilizadorResult)
      },
        error => "Update Service Unavailable");
  }

}
