import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TipoMaquina } from 'src/app/core/models/tipo-maquina.model';
import { TipoMaquinaService } from 'src/app/core/services/tipo-maquina/tipo-maquina.service';
import { Operacao } from 'src/app/core/models/operacao.model';
import { OperacaoService } from 'src/app/core/services/operacao/operacao.service';

@Component({
  selector: 'app-tipo-maquina',
  templateUrl: './tipo-maquina.component.html',
  styleUrls: ['./tipo-maquina.component.css']
})
export class TipoMaquinaComponent implements OnInit {

  operacoesAssociadas: Operacao[];
  allOperacoes: Operacao[];
  allTiposMaquina: TipoMaquina[];
  statusMessage: string;

  constructor(private TipoMaquinaSrv: TipoMaquinaService,
    private OperacaoSrv: OperacaoService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getTiposMaquina();
    this.getOperacoesDisponiveis();
    this.operacoesAssociadas = new Array;
  }

  private getTiposMaquina(): void {
    this.TipoMaquinaSrv.getTiposMaquina().subscribe(
      data => { console.log(data); this.allTiposMaquina = data; },
      error => { this.statusMessage = "Error: Service Unavailable" });
  }

  private getOperacoesDisponiveis() {
    this.OperacaoSrv.getOperacoes().subscribe(data => { console.log(data); this.allOperacoes = data },
      error => { this.statusMessage = "Error: Service Unavailable" })
  }

  assOperacaoTipoMaquina(Id: string) {
    var operacao = this.allOperacoes.find(operacao => operacao.Id === Id);
    this.allOperacoes = this.allOperacoes.filter(h => h.Id !== Id);
    this.operacoesAssociadas.push(operacao);
  }

  deleteAssOperacaoTipoMaquina(Id: string){
    var operacao = this.operacoesAssociadas.find(operacao => operacao.Id === Id);
    this.operacoesAssociadas = this.operacoesAssociadas.filter(h => h.Id !== Id);
    this.allOperacoes.push(operacao);
  }

  /**
   * Add TipoMaquina to API MDF
   * @param IdTipoMaquina Id of an operation
   * @param DescricaoTipoMaquina brief description what the operation is about
   */
  addTipoMaquina(IdTipoMaquina: string, DescricaoTipoMaquina: string): void {
    DescricaoTipoMaquina = DescricaoTipoMaquina.trim();
    if (!IdTipoMaquina) {
      return;
    }

    this.TipoMaquinaSrv.addTipoMaquina(new TipoMaquina(IdTipoMaquina, DescricaoTipoMaquina, this.operacoesAssociadas))
      .subscribe(
        TipoMaquina => { this.allTiposMaquina.push(TipoMaquina); },
        error => { this.statusMessage = "Error: Service Unavailable"; }
      );
    this.operacoesAssociadas = new Array;
    this.getOperacoesDisponiveis();
  }

  delete(tipoMaquina: TipoMaquina): void {
    this.allTiposMaquina = this.allTiposMaquina.filter(h => h !== tipoMaquina);
    this.TipoMaquinaSrv.deleteTipoMaquina(tipoMaquina.id_tipoMaquina).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  goBack(): void {
    this.location.back();
  }

}
