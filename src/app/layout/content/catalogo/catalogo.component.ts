import { Component, OnInit } from '@angular/core';
import { Stat } from 'src/app/core/models/stat.model';
import { EncomendaService } from 'src/app/core/services/encomenda/encomenda.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  stats: Stat[];

  constructor(private encomendaSrv: EncomendaService) { }

  ngOnInit() {
    this.maisEncomendados();
  }

  maisEncomendados() {
    this.encomendaSrv.maisEncomendado().subscribe(statisticsResult => {
      this.stats = statisticsResult;
    },
      error => {
        alert("Service Unavaiable");
      });
  }

  maisVezesEncomendados() {
    this.encomendaSrv.maisVezesEncomendado().subscribe(statisticsResult => {
      this.stats = statisticsResult;
    },
      error => {
        alert("Service Unavaiable");
      });
  }

  menorTempoProducao() {
    this.encomendaSrv.menorTempoProducao().subscribe(statisticsResult => {
      this.stats = statisticsResult;
    },
      error => {
        alert("Service Unavaiable");
      });
  }

}
