import { Component, OnInit, Input } from '@angular/core';
import { Produto } from 'src/app/core/models/produto.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProdutoService } from 'src/app/core/services/produto/produto.service';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.component.html',
  styleUrls: ['./produto-detail.component.css']
})
export class ProdutoDetailComponent implements OnInit {


  @Input() produto: Produto;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getProduto();
  }

  getProduto(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.produtoService.getProduto(id)
      .subscribe(produroResult => this.produto = produroResult,
        error => "Update Service Unavailable");
  }

  save(): void {
    this.produtoService.updateProduto(this.produto)
      .subscribe(() => this.goBack(), error => "Update Service Unavailable");
  }

  goBack(): void {
    this.location.back();
  }

}
