import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components for routing
import { CriarOperacaoComponent } from './layout/content/criar-operacao/criar-operacao.component';
import { OperacaoDetailComponent } from './layout/content/criar-operacao/operacao-detail/operacao-detail.component';


const routes: Routes = [
  { path: 'criar-operacao', component: CriarOperacaoComponent },
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'operacao-detail/:id', component: OperacaoDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
