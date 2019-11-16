import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TipoMaquina } from 'src/app/core/models/tipo-maquina.model';
import { TipoMaquinaService } from 'src/app/core/services/tipo-maquina/tipo-maquina.service';
import { MessageLogService } from 'src/app/core/services/MessageLog/message-log.service';
import { Operacao } from 'src/app/core/models/operacao.model';
import { TiposMaquinaOperacao } from 'src/app/core/models/tipos-maquina-operacao.model';
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
      .subscribe(tipoMaquinaResult => this.tipomaquina = tipoMaquinaResult,
        error => "Update Service Unavailable");
  }
  
  private getOperacoesDisponiveis() {
    this.operacaoSrv.getOperacoes().subscribe(data => { console.log(data); this.operacoesAll = data },
      error => { this.messageResponse = "Error: Service Unavailable" })
  }

  save(): void {
    this.tipoMaquinaService.updateTipoMaquina(this.tipomaquina)
      .subscribe(() => this.goBack(), error => "Update Service Unavailable");
  }

  goBack(): void {
    this.location.back();
  }

}
