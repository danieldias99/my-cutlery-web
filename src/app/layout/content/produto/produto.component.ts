import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProdutoService } from 'src/app/core/services/produto/produto.service';
import { OperacaoService } from 'src/app/core/services/operacao/operacao.service';
import { Produto } from 'src/app/core/models/produto.model';
import { Operacao } from 'src/app/core/models/operacao.model';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  allProdutos: Produto[];
  allOperacoes: Operacao[];
  allOperacoesToShow: Operacao[];
  operacoesAssociadas: string[];
  operacoesAssociadasToShow: Operacao[];
  statusMessage: string;

  constructor(private produtoSrv: ProdutoService,
    private OperacaoSrv: OperacaoService,
    private route: ActivatedRoute,
    private location: Location) {
    this.allProdutos = new Array();
  }

  ngOnInit() {
    this.getProdutos();
    this.getOperacoesDisponiveis();
    this.operacoesAssociadas = new Array;
    this.operacoesAssociadasToShow = new Array;
  }

  private getProdutos(): void {
    this.produtoSrv.getProdutos().subscribe(
      data => { console.log(data); this.allProdutos = data; },
      error => { this.statusMessage = "Error: Service Unavailable" });
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

  assOperacaoPlanoFabrico(Id: string) {
    var operacao = this.allOperacoesToShow.find(operacao => operacao.id === Id);
    this.allOperacoesToShow = this.allOperacoesToShow.filter(h => h.id !== Id);
    this.operacoesAssociadas.push(operacao.id);
    this.operacoesAssociadasToShow.push(operacao);
  }

  deleteAssOperacaoPlanoFabrico(Id: string) {
    var operacaoID = this.operacoesAssociadas.find(operacao => operacao === Id);
    this.operacoesAssociadas = this.operacoesAssociadas.filter(h => h !== Id);
    var operacao = this.allOperacoes.find(operacao => operacao.id === operacaoID);
    this.operacoesAssociadasToShow = this.operacoesAssociadasToShow.filter(h => h.id !== Id);
    this.allOperacoesToShow.push(operacao);
  }

  /**
   * Add Produto to API MDF
   * @param IdProduto Id of a Product
   * @param descricaoProduto brief description what the operation is about
   * @param idPlanoFabrico Id of Fabric Plan
   */
  addProduto(IdProduto: string, nomeProduto: string, descricaoProduto: string, idPlanoFabrico: string): void {
    descricaoProduto = descricaoProduto.trim();
    nomeProduto = nomeProduto.trim();
    if (!IdProduto) {
      return;
    }

    this.produtoSrv.addProduto(new Produto(IdProduto, nomeProduto, descricaoProduto, idPlanoFabrico, this.operacoesAssociadas))
      .subscribe(
        Produto => { this.allProdutos.push(Produto); },
        error => { this.statusMessage = "Error: Service Unavailable"; }
      );
  }

  delete(produto: Produto): void {
    this.allProdutos = this.allProdutos.filter(h => h !== produto);
    this.produtoSrv.deleteProduto(produto.Id).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
