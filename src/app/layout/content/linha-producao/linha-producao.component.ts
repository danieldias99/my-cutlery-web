import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LinhaProducaoService } from 'src/app/core/services/linha-producao/linha-producao.service';
import { MaquinaService } from 'src/app/core/services/maquina/maquina.service';
import { Maquina } from 'src/app/core/models/maquina.model';
import { LinhaProducao } from 'src/app/core/models/linha-producao';

@Component({
  selector: 'app-linha-producao',
  templateUrl: './linha-producao.component.html',
  styleUrls: ['./linha-producao.component.css']
})
export class LinhaProducaoComponent implements OnInit {

  maquinasAssociadas: Maquina[];
  allMaquinas: Maquina[];
  allLinhasProducao: LinhaProducao[];
  statusMessage: string;

  constructor(private linhaProducaoSrv: LinhaProducaoService,
    private maquinaSrv: MaquinaService,
    private route: ActivatedRoute,
    private location: Location) { }

    ngOnInit() {
      this.getTiposMaquina();
      this.getOperacoesDisponiveis();
      this.maquinasAssociadas = new Array;
    }
  
    private getTiposMaquina(): void {
      this.linhaProducaoSrv.getLinhasProducao().subscribe(
        data => { console.log(data); this.allLinhasProducao = data; },
        error => { this.statusMessage = "Error: Service Unavailable" });
    }
  
    private getOperacoesDisponiveis() {
      this.maquinaSrv.getMaquinas().subscribe(data => { console.log(data); this.allMaquinas = data },
        error => { this.statusMessage = "Error: Service Unavailable" })
    }
  
    assMaquinaLinhaProducao(Id: number) {
      var maquina = this.allMaquinas.find(maquina => maquina.id === Id);
      this.allMaquinas = this.allMaquinas.filter(h => h.id !== Id);
      this.maquinasAssociadas.push(maquina);
    }
  
    deleteAssMaquinaLinhaProducao(Id: number){
      var maquina = this.maquinasAssociadas.find(maquina => maquina.id === Id);
      this.maquinasAssociadas = this.maquinasAssociadas.filter(h => h.id !== Id);
      this.allMaquinas.push(maquina);
    }
  
    /**
     * Add LinhaProducao to API MDF
     * @param IdLinhaProducao Id of an operation
     * @param DescricaoLinhaProducao brief description what the operation is about
     */
    addLinhaProducao(IdLinhaProducao: string): void {
      if (!IdLinhaProducao) {
        return;
      }
  
      this.linhaProducaoSrv.addLinhaProducao(new LinhaProducao(IdLinhaProducao, this.maquinasAssociadas))
        .subscribe(
          LinhaProducao => { this.allLinhasProducao.push(LinhaProducao); },
          error => { this.statusMessage = "Error: Service Unavailable"; }
        );
      this.maquinasAssociadas = new Array;
      this.getOperacoesDisponiveis();
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
