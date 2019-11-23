import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LinhaProducao } from 'src/app/core/models/linha-producao';
import { Maquina } from 'src/app/core/models/maquina.model';
import { LinhaProducaoService } from 'src/app/core/services/linha-producao/linha-producao.service';
import { MaquinaService } from 'src/app/core/services/maquina/maquina.service';

@Component({
  selector: 'app-linha-producao-detail',
  templateUrl: './linha-producao-detail.component.html',
  styleUrls: ['./linha-producao-detail.component.css']
})
export class LinhaProducaoDetailComponent implements OnInit {

  @Input() linhaproducao: LinhaProducao;

  maquinasAssociadas: Maquina[];
  maquinasAll: Maquina[];

  messageResponse: string;

  constructor(private route: ActivatedRoute,
    private linhaProducaoService: LinhaProducaoService,
    private maquinaSrv: MaquinaService,
    private location: Location) { }

  ngOnInit() {
    this.getLinhaProducao();
    this.getMaquinasDisponiveis();
  }

  getLinhaProducao(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.linhaProducaoService.getLinhaProducao(id)
      .subscribe(linhaProducaoResult => { this.linhaproducao = linhaProducaoResult; console.log(linhaProducaoResult); this.maquinasAssociadas = this.linhaproducao.maquinas },
        error => "Update Service Unavailable");
  }

  private getMaquinasDisponiveis() {
    this.maquinaSrv.getMaquinas().subscribe(data => { console.log(data); this.maquinasAll = data },
      error => { this.messageResponse = "Error: Service Unavailable" })
  }

  save(): void {
    this.linhaProducaoService.updateLinhaProducao(this.linhaproducao)
      .subscribe(() => this.goBack(), error => "Update Service Unavailable");
  }

  goBack(): void {
    this.location.back();
  }
}
