import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Operacao } from 'src/app/core/models/operacao.model';
import { OperacaoService } from 'src/app/core/services/operacao/operacao.service';

@Component({
  selector: 'app-operacao-detail',
  templateUrl: './operacao-detail.component.html',
  styleUrls: ['./operacao-detail.component.css']
})
export class OperacaoDetailComponent implements OnInit {

  @Input() operacao: Operacao;

  constructor(
    private route: ActivatedRoute,
    private operacaoService: OperacaoService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getOperacao();
  }

  getOperacao(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.operacaoService.getOperacao(id)
      .subscribe(operacaoResult => this.operacao = operacaoResult,
        error => "Update Service Unavailable");
  }

  save(): void {
    this.operacaoService.updateOperacao(this.operacao)
      .subscribe(() => this.goBack(), error => "Update Service Unavailable");
  }

  goBack(): void {
    this.location.back();
  }

}
