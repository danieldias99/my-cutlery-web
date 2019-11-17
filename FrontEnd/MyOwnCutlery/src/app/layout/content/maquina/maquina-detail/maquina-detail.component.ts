import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TipoMaquinaService } from 'src/app/core/services/tipo-maquina/tipo-maquina.service';
import { Maquina } from 'src/app/core/models/maquina.model';
import { TipoMaquina } from 'src/app/core/models/tipo-maquina.model';
import { MaquinaService } from 'src/app/core/services/maquina/maquina.service';

@Component({
  selector: 'app-maquina-detail',
  templateUrl: './maquina-detail.component.html',
  styleUrls: ['./maquina-detail.component.css']
})
export class MaquinaDetailComponent implements OnInit {

  @Input() maquina: Maquina;

  tiposMaquinaAll: TipoMaquina[];

  messageResponse: string;

  constructor(private route: ActivatedRoute,
    private tipoMaquinaService: TipoMaquinaService,
    private maquinaSrv: MaquinaService,
    private location: Location) { }

  ngOnInit() {
    this.getMaquina();
    this.getTiposMaquinaDisponiveis();
  }

  getMaquina(): void {
    const id = +this.route.snapshot.paramMap.get('id_maquina');
    this.maquinaSrv.getMaquina(id)
      .subscribe(maquinaResult => this.maquina = maquinaResult,
        error => "Update Service Unavailable");
  }
  
  private getTiposMaquinaDisponiveis() {
    this.tipoMaquinaService.getTiposMaquina().subscribe(data => { console.log(data); this.tiposMaquinaAll = data },
      error => { this.messageResponse = "Error: Service Unavailable" })
  }

  save(): void {
    this.maquinaSrv.updateMaquina(this.maquina)
      .subscribe(() => this.goBack(), error => "Update Service Unavailable");
  }

  goBack(): void {
    this.location.back();
  }


}
