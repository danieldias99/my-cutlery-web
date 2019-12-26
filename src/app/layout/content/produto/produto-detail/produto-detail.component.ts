import { Component, OnInit, Input } from '@angular/core';
import { Produto } from 'src/app/core/models/produto.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProdutoService } from 'src/app/core/services/produto/produto.service';
import { Operacao } from 'src/app/core/models/operacao.model';
import { OperacaoService } from 'src/app/core/services/operacao/operacao.service';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.component.html',
  styleUrls: ['./produto-detail.component.css']
})
export class ProdutoDetailComponent implements OnInit {

  allOperacoes: Operacao[];
  allOperacoesToShow: Operacao[];
  operacoesAssociadas: string[];
  operacoesAssociadasToShow: Operacao[];
  statusMessage: string;

  @Input() produto: Produto;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private OperacaoSrv: OperacaoService,
    private location: Location
  ) { }

  ngOnInit() {
    this.operacoesAssociadas = new Array;
    this.operacoesAssociadasToShow = new Array;
    this.getOperacoesDisponiveis();
    this.getProduto();
    
  }

  getProduto(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.produtoService.getProduto(id)
      .subscribe(produroResult => { this.produto = produroResult;
        this.operacoesAssociadas = this.produto.planofabrico.operacoes;
        this.produto.planofabrico.operacoes.forEach(element => {
          var operacao = this.allOperacoesToShow.find(operacao => operacao.id === element);
          this.operacoesAssociadasToShow.push(operacao);
        });
      },
        error => "Update Service Unavailable");
  }

  private getOperacoesDisponiveis() {
    this.OperacaoSrv.getOperacoes().subscribe(
      data => {
        console.log(data);
        this.allOperacoes = data;
        this.allOperacoesToShow = data;
      },
      error => { this.statusMessage = "Error: Service Unavailable" })
  }

  save(): void {
    this.produtoService.updateProduto(this.produto)
      .subscribe(() => this.goBack(), error => "Update Service Unavailable");
  }

  goBack(): void {
    this.location.back();
  }

}
