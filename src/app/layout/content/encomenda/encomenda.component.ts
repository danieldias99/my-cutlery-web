import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Produto } from 'src/app/core/models/produto.model';
import { EncomendaService } from 'src/app/core/services/encomenda/encomenda.service';
import { ProdutoService } from 'src/app/core/services/produto/produto.service';
import { ProdutoEncomenda } from 'src/app/core/models/produto-encomenda';
import { Location } from '@angular/common';

@Component({
  selector: 'app-encomenda',
  templateUrl: './encomenda.component.html',
  styleUrls: ['./encomenda.component.css']
})
export class EncomendaComponent implements OnInit {

  @Input() produtoSelecionado: Produto;

  @Input() allProdutos: Produto[];

  @Input() allProdutosFilter: Produto[];

  @Input() produtosEncomenda: ProdutoEncomenda[];

  constructor(private encomendaSrv: EncomendaService,
    private produtoSrv: ProdutoService,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.getProdutos();
    this.produtosEncomenda = new Array();
    this.produtoSelecionado = new Produto('', '', '', '', []);
  }

  getProdutos() {
    this.produtoSrv.getProdutos().subscribe(produtosResult => {
      this.allProdutos = produtosResult;
      this.allProdutosFilter = produtosResult;
      console.log(produtosResult);
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
    this.produtoSelecionado = new Produto('', '', '', '', []);
  }

  remProdutoAoCarrinho(nomeProduto: String) {
    let produto = this.allProdutos.find(h => h.nomeProduto === nomeProduto);
    this.allProdutosFilter.push(produto);
    this.produtosEncomenda = this.produtosEncomenda.filter(h => h.nomeProduto !== nomeProduto);
  }

  newEncomenda(data_entrega: String) {
    if (data_entrega === '' || this.produtosEncomenda.length === 0) {
      alert("Preencha todos os campos!!");
      return
    }

    this.encomendaSrv.addEncomenda(this.produtosEncomenda, data_entrega).subscribe(_ => {
      this.router.navigate(['/sessao']);
    });

  }

  back() {
    this.location.back();
  }

}
