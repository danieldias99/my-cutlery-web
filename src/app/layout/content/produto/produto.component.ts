import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProdutoService } from 'src/app/core/services/produto/produto.service';
import { Produto } from 'src/app/core/models/produto.model';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  allProdutos: Produto[];
  statusMessage: string;

  constructor(private produtoSrv: ProdutoService,
    private route: ActivatedRoute,
    private location: Location) {
    this.allProdutos = new Array(); }

  
    ngOnInit() { this.getProdutos(); }

    private getProdutos(): void {
      this.produtoSrv.getProdutos().subscribe(
        data => { console.log(data); this.allProdutos = data; },
        error => { this.statusMessage = "Error: Service Unavailable" });
    }
  
    /**
     * Add Produto to API MDF
     * @param IdProduto Id of an operation
     * @param descricaoProduto brief description what the operation is about
     */
    addProduto(IdProduto: string, nomeProduto: string, descricaoProduto: string): void {
      descricaoProduto = descricaoProduto.trim();
      nomeProduto = nomeProduto.trim();
      if (!IdProduto) {
        return;
      }
  
      this.produtoSrv.addProduto(new Produto(IdProduto, nomeProduto,descricaoProduto))
        .subscribe(
          Produto => { this.allProdutos.push(Produto); },
          error => { this.statusMessage = "Error: Service Unavailable"; }
        );
    }
  
    delete(produto: Produto): void {
      this.allProdutos = this.allProdutos.filter(h => h !== produto);
      this.produtoSrv.deleteProduto(produto.id).subscribe(res => {
        console.log(res);
      }, error => {
        console.log(error);
      });
    }
  
    goBack(): void {
      this.location.back();
    }
}
