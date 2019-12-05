import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components for routing
import { CriarOperacaoComponent } from './layout/content/criar-operacao/criar-operacao.component';
import { OperacaoDetailComponent } from './layout/content/criar-operacao/operacao-detail/operacao-detail.component';
import { TipoMaquinaComponent } from './layout/content/tipo-maquina/tipo-maquina.component';
import { TipoMaquinaDetailComponent } from './layout/content/tipo-maquina/tipo-maquina-detail/tipo-maquina-detail.component';
import { MaquinaComponent } from './layout/content/maquina/maquina.component';
import { MaquinaDetailComponent } from './layout/content/maquina/maquina-detail/maquina-detail.component';
import { LinhaProducaoComponent } from './layout/content/linha-producao/linha-producao.component';
import { LinhaProducaoDetailComponent } from './layout/content/linha-producao/linha-producao-detail/linha-producao-detail.component';
import { ProdutoComponent } from './layout/content/produto/produto.component';
import { ProdutoDetailComponent } from './layout/content/produto/produto-detail/produto-detail.component';
import { VisualizacaoComponent } from './layout/content/visualizacao/visualizacao.component'

const routes: Routes = [
  { path: 'criar-operacao', component: CriarOperacaoComponent },
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'operacao-detail/:id', component: OperacaoDetailComponent },
  { path: 'tipos-maquina', component: TipoMaquinaComponent },
  { path: 'tipo-maquina-detail/:id_tipoMaquina', component: TipoMaquinaDetailComponent },
  { path: 'maquinas', component: MaquinaComponent },
  { path: 'maquina-detail/:id_maquina', component: MaquinaDetailComponent },
  { path: 'linhas-producao', component: LinhaProducaoComponent },
  { path: 'linha-producao-detail/:id', component: LinhaProducaoDetailComponent },
  { path: 'produtos', component: ProdutoComponent },
  { path: 'produto-detail/:id', component: ProdutoDetailComponent },
  { path: 'visualizacao-execucao', component: VisualizacaoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
