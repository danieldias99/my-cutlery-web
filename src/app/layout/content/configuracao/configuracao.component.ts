import { Component, OnInit } from '@angular/core';
import { ConfiguracaoService } from 'src/app/core/services/configuracao.service';
import { Config } from 'src/app/core/models/config.model';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.css']
})
export class ConfiguracaoComponent implements OnInit {

  config: string;

  constructor(private configSrv: ConfiguracaoService) { }

  ngOnInit() {
    this.fetchEncomendas();
  }

  fetchEncomendas() {
    this.configSrv.fetchEncomendas().subscribe(configResult => {
      this.config = JSON.stringify(configResult, undefined, 4);
    },
      error => "Update Service Unavailable");
  }

  actionAuth(comando: string) {
    if (comando.includes('add') && comando.split(' ').length === 4) {
      this.addConfig(comando.split(' ')[1], comando.split(' ')[2], comando.split(' ')[3]);
    } else if (comando.includes('rm') && comando.split(' ').length === 4) {
      this.remConfig(comando.split(' ')[1], comando.split(' ')[2], comando.split(' ')[3]);
    } else {
      alert('Comando errado');
    }
  }

  addConfig(role: string, resources: string, permissions: string) {
    var resourcesA = resources.split(',');
    var permissionsA = permissions.split(',');
    this.configSrv.addEncomendas(role, resourcesA, permissionsA).subscribe(data => {
      alert('Autorização Adicionada');
      this.fetchEncomendas();
    });
  }

  remConfig(role: string, resources: string, permissions: string) {
    var resourcesA = resources.split(',');
    var permissionsA = permissions.split(',');
    this.configSrv.remEncomendas(role, resourcesA, permissionsA).subscribe(data => {
      alert('Autorização Eliminada');
      this.fetchEncomendas();
    });
  }
}
