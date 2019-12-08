import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MaquinaService } from 'src/app/core/services/maquina/maquina.service';
import { Maquina } from 'src/app/core/models/maquina.model';
import { TipoMaquina } from 'src/app/core/models/tipo-maquina.model';
import { TipoMaquinaService } from 'src/app/core/services/tipo-maquina/tipo-maquina.service';
import { LinhaProducao } from 'src/app/core/models/linha-producao';
import { LinhaProducaoService } from 'src/app/core/services/linha-producao/linha-producao.service';

@Component({
  selector: 'app-maquina',
  templateUrl: './maquina.component.html',
  styleUrls: ['./maquina.component.css']
})
export class MaquinaComponent implements OnInit {

  allMaquinas: Maquina[];
  allTiposMaquina: TipoMaquina[];
  allLinhasProducao: LinhaProducao[];
  statusMessage: string;

  constructor(private maquinaSrv: MaquinaService,
    private tipoMaquinaSrv: TipoMaquinaService,
    private linhasProducaoSrv: LinhaProducaoService,
    private route: Router,
    private location: Location) { }

  ngOnInit() {
    this.getMaquinas();
    this.getTiposMaquinaDisponiveis();
    this.getLinhasProducaoDisponiveis();
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

  private getLinhasProducaoDisponiveis() {
    this.linhasProducaoSrv.getLinhasProducao().subscribe(data => { console.log(data); this.allLinhasProducao = data },
      error => { this.statusMessage = "Error: Service Unavailable" })
  }

  /**
   * Add Maquina to API MDF
   * @param Id_maquina Id of an operation
   * @param nomeMaquina brief description what the operation is about
   */
  addMaquina(Id_maquina: number, nomeMaquina: string, marcaMaquina: string, modeloMaquina: string, x: string, y: string, posicaoRelativa :string, id_tipoMaquina: string,  id_linhaProducao: string): void {
    nomeMaquina = nomeMaquina.trim();
    if (!Id_maquina) {
      return;
    }

    this.maquinaSrv.addMaquina(new Maquina(Id_maquina, nomeMaquina, marcaMaquina, modeloMaquina, x, y, posicaoRelativa, id_tipoMaquina, id_linhaProducao))
      .subscribe(
        maquina => { 
          this.allMaquinas.push(maquina); 
          this.route.navigate(['/visualizacao-execucao']);
        },
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

