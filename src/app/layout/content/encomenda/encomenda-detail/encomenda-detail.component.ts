import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { EncomendaService } from 'src/app/core/services/encomenda/encomenda.service';
import { Encomenda } from 'src/app/core/models/encomenda';
import { Produto } from 'src/app/core/models/produto.model';
import { ProdutoEncomenda } from 'src/app/core/models/produto-encomenda';
import { ProdutoService } from 'src/app/core/services/produto/produto.service';

@Component({
  selector: 'app-encomenda-detail',
  templateUrl: './encomenda-detail.component.html',
  styleUrls: ['./encomenda-detail.component.css']
})
export class EncomendaDetailComponent implements OnInit {

  @Input() encomenda: Encomenda;

  @Input() produtoSelecionado: Produto;

  @Input() allProdutos: Produto[];

  @Input() allProdutosFilter: Produto[];

  @Input() produtosEncomenda: ProdutoEncomenda[];

  constructor(private encomendaSrv: EncomendaService,
    private produtoSrv: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.allProdutosFilter = new Array();
    this.getEncomenda();
    this.getProdutos();
    this.produtosEncomenda = new Array();
    this.produtoSelecionado = new Produto('', '', '');
  }

  getEncomenda(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.encomendaSrv.getEncomenda(id)
      .subscribe(encomendaResult => {
        this.encomenda = encomendaResult;
        this.produtosEncomenda = encomendaResult.produtos;
        console.log(encomendaResult);
      },
        error => "Update Service Unavailable");
  }

  update() {
    this.encomenda.produtos = this.produtosEncomenda;
    this.encomendaSrv.updateEncomenda(this.encomenda).subscribe(_ => {
      this.router.navigate(['/sessao']);
    },
      error => "Update Service Unavailable");
  }

  getProdutos() {
    this.produtoSrv.getProdutos().subscribe(produtosResult => {
      this.allProdutos = produtosResult;
      console.log(produtosResult);
      produtosResult.forEach(element => {
        if (this.produtosEncomenda.find(h => h.nomeProduto !== element.nomeProduto)) {
          this.allProdutosFilter.push(element);
        }
      });
      console.log(this.allProdutosFilter);
      console.log(this.allProdutos);
    },
      error => { alert("Sorry we are having problems") });
  }

  chooseProduto(produto: Produto) {
    this.produtoSelecionado = produto;
  }

  addProdutoAoCarrinho(quantidade: String) {
    if (quantidade === '') {
      alert('Digite a quantidade do produto');
      return
    }
    this.produtosEncomenda.push(new ProdutoEncomenda(this.produtoSelecionado.nomeProduto, quantidade));
    this.allProdutosFilter = this.allProdutosFilter.filter(h => h !== this.produtoSelecionado);
    this.produtoSelecionado = new Produto('', '', '');
  }

  remProdutoAoCarrinho(nomeProduto: String) {
    let produto = this.allProdutos.find(h => h.nomeProduto === nomeProduto);
    this.allProdutosFilter.push(produto);
    this.produtosEncomenda = this.produtosEncomenda.filter(h => h.nomeProduto !== nomeProduto);
  }

  goBack() {
    this.location.back();
  }

}
