import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LinhaProducaoService } from 'src/app/core/services/linha-producao/linha-producao.service';
import { LinhaProducao } from 'src/app/core/models/linha-producao';

@Component({
  selector: 'app-linha-producao',
  templateUrl: './linha-producao.component.html',
  styleUrls: ['./linha-producao.component.css']
})
export class LinhaProducaoComponent implements OnInit {

  allLinhasProducao: LinhaProducao[];
  statusMessage: string;

  constructor(private linhaProducaoSrv: LinhaProducaoService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getLinhasProducao();
  }

  private getLinhasProducao(): void {
    this.linhaProducaoSrv.getLinhasProducao().subscribe(
      data => { console.log(data); this.allLinhasProducao = data; },
      error => { this.statusMessage = "Error: Service Unavailable" });
  }

  /**
   * Add LinhaProducao to API MDF
   * @param IdLinhaProducao Id of an operation
   * @param DescricaoLinhaProducao brief description what the operation is about
   */
  addLinhaProducao(IdLinhaProducao: string, descricao: string, posicao_x: string, posicao_y: string, orientacao: string, comprimento: string, largura: string): void {
    if (!IdLinhaProducao) {
      return;
    }

    this.linhaProducaoSrv.addLinhaProducao(new LinhaProducao(IdLinhaProducao, descricao, posicao_x, posicao_y, orientacao, comprimento, largura))
      .subscribe(
        LinhaProducao => { this.allLinhasProducao.push(LinhaProducao); },
        error => { this.statusMessage = "Error: Service Unavailable"; }
      );
  }

  delete(LinhaProducao: LinhaProducao): void {
    this.allLinhasProducao = this.allLinhasProducao.filter(h => h !== LinhaProducao);
    this.linhaProducaoSrv.deleteLinhaProducao(LinhaProducao.id).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  goBack(): void {
    this.location.back();
  }
}