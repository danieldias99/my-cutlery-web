import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TipoMaquina } from 'src/app/core/models/tipo-maquina.model';
import { TipoMaquinaService } from 'src/app/core/services/tipo-maquina/tipo-maquina.service';
import { Operacao } from 'src/app/core/models/operacao.model';
import { OperacaoService } from 'src/app/core/services/operacao/operacao.service';


@Component({
  selector: 'app-tipo-maquina-detail',
  templateUrl: './tipo-maquina-detail.component.html',
  styleUrls: ['./tipo-maquina-detail.component.css']
})
export class TipoMaquinaDetailComponent implements OnInit {

  @Input() tipomaquina: TipoMaquina;

  operacoesAssociadas: Operacao[];
  operacoesAll: Operacao[];

  messageResponse: string;

  constructor(private route: ActivatedRoute,
    private tipoMaquinaService: TipoMaquinaService,
    private operacaoSrv: OperacaoService,
    private location: Location) { }

  ngOnInit() {
    this.getTipoMaquina();
    this.getOperacoesDisponiveis();
  }

  getTipoMaquina(): void {
    const id = +this.route.snapshot.paramMap.get('id_tipoMaquina');
    this.tipoMaquinaService.getTipoMaquina(id)
      .subscribe(tipoMaquinaResult => {
      this.tipomaquina = tipoMaquinaResult;
        this.operacoesAssociadas = this.tipomaquina.operacoes;
      },
        error => "Update Service Unavailable");
  }

  private getOperacoesDisponiveis() {
    this.operacaoSrv.getOperacoes().subscribe(data => { console.log(data); this.operacoesAll = data },
      error => { this.messageResponse = "Error: Service Unavailable" });
  }

  assOperacaoTipoMaquina(Id: string) {
    var operacao = this.operacoesAll.find(operacao => operacao.id === Id);
    this.operacoesAll = this.operacoesAll.filter(h => h.id !== Id);
    this.operacoesAssociadas.push(operacao);
  }

  deleteAssOperacaoTipoMaquina(Id: string) {
    var operacao = this.operacoesAssociadas.find(operacao => operacao.id === Id);
    this.operacoesAssociadas = this.operacoesAssociadas.filter(h => h.id !== Id);
    this.operacoesAll.push(operacao);
  }

  save(): void {
    this.tipoMaquinaService.updateTipoMaquina(new TipoMaquina(this.tipomaquina.id_tipoMaquina, this.tipomaquina.descricaoTipoMaquina, this.operacoesAssociadas))
      .subscribe(() => this.goBack(), error => "Update Service Unavailable");
  }

  goBack(): void {
    this.location.back();
  }

}
