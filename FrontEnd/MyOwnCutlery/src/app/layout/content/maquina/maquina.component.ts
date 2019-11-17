import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MaquinaService } from 'src/app/core/services/maquina/maquina.service';
import { Maquina } from 'src/app/core/models/maquina.model';
import { TipoMaquina } from 'src/app/core/models/tipo-maquina.model';
import { TipoMaquinaService } from 'src/app/core/services/tipo-maquina/tipo-maquina.service';

@Component({
  selector: 'app-maquina',
  templateUrl: './maquina.component.html',
  styleUrls: ['./maquina.component.css']
})
export class MaquinaComponent implements OnInit {

  allMaquinas: Maquina[];
  allTiposMaquina: TipoMaquina[];
  statusMessage: string;

  constructor(private maquinaSrv: MaquinaService,
    private tipoMaquinaSrv: TipoMaquinaService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getMaquinas();
    this.getTiposMaquinaDisponiveis();
  }

  private getMaquinas(): void {
    this.maquinaSrv.getMaquinas().subscribe(
      data => { console.log(data); this.allMaquinas = data; },
      error => { this.statusMessage = "Error: Service Unavailable" });
  }

  private getTiposMaquinaDisponiveis() {
    this.tipoMaquinaSrv.getTiposMaquina().subscribe(data => { console.log(data); this.allTiposMaquina = data },
      error => { this.statusMessage = "Error: Service Unavailable" })
  }

  /*assOperacaoTipoMaquina(Id: string) {
    var operacao = this.allOperacoes.find(operacao => operacao.Id === Id);
    this.allOperacoes = this.allOperacoes.filter(h => h.Id !== Id);
    this.operacoesAssociadas.push(operacao);
  }
 
  deleteAssOperacaoTipoMaquina(Id: string){
    var operacao = this.operacoesAssociadas.find(operacao => operacao.Id === Id);
    this.operacoesAssociadas = this.operacoesAssociadas.filter(h => h.Id !== Id);
    this.allOperacoes.push(operacao);
  }*/

  /**
   * Add Maquina to API MDF
   * @param Id_maquina Id of an operation
   * @param nomeMaquina brief description what the operation is about
   */
  addMaquina(Id_maquina: number, nomeMaquina: string, posicaoMaquinaNaLinha: string, id_tipoMaquina: string): void {
    nomeMaquina = nomeMaquina.trim();
    if (!Id_maquina) {
      return;
    }

    this.maquinaSrv.addMaquina(new Maquina(Id_maquina, nomeMaquina, posicaoMaquinaNaLinha, id_tipoMaquina))
      .subscribe(
        maquina => { this.allMaquinas.push(maquina); },
        error => { this.statusMessage = "Error: Service Unavailable"; }
      );
    this.getTiposMaquinaDisponiveis();
  }

  delete(maquina: Maquina): void {
    this.allMaquinas = this.allMaquinas.filter(h => h !== maquina);
    this.maquinaSrv.deleteMaquina(maquina.id).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  goBack(): void {
    this.location.back();
  }

}
