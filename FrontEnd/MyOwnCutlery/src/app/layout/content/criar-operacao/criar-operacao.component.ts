import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { Operacao } from "../../../core/models/operacao.model"
import { OperacaoService } from "../../../core/services/operacao/operacao.service"

@Component({
  selector: 'app-criar-operacao',
  templateUrl: './criar-operacao.component.html',
  styleUrls: ['./criar-operacao.component.css']
})
export class CriarOperacaoComponent implements OnInit {

  allOperacoes: Operacao[];
  statusMessage: string;

  @Input() operacao: Operacao;

  constructor(private operacaoSrv: OperacaoService,
    private route: ActivatedRoute,
    private location: Location) {
    this.allOperacoes = new Array();
  }

  ngOnInit() { this.getOperacoes(); }

  private getOperacoes(): void {
    this.operacaoSrv.getOperacoes().subscribe(
      data => { console.log(data); this.allOperacoes = data; },
      error => { this.statusMessage = "Error: Service Unavailable" });
  }

  /**
   * Add Operacao to API MDF
   * @param IdOperacao Id of an operation
   * @param DescricaoOperacao brief description what the operation is about
   */
  addOperacao(IdOperacao: string, DescricaoOperacao: string, DuracaoOperacao: string): void {
    DescricaoOperacao = DescricaoOperacao.trim();
    DuracaoOperacao = DuracaoOperacao.trim();
    if (!IdOperacao) {
      return;
    }

    this.operacaoSrv.addOperacao(new Operacao(IdOperacao, DescricaoOperacao, DuracaoOperacao))
      .subscribe(
        operacao => { this.allOperacoes.push(operacao); },
        error => { this.statusMessage = "Error: Service Unavailable"; }
      );
  }

  delete(operacao: Operacao): void {
    this.allOperacoes = this.allOperacoes.filter(h => h !== operacao);
    this.operacaoSrv.deleteOperacao(operacao.Id).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  goBack(): void {
    this.location.back();
  }

}
