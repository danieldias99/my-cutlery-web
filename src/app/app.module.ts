import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { CriarOperacaoComponent } from './layout/content/criar-operacao/criar-operacao.component';
import { FooterComponent } from './layout/footer/footer.component';
import { OperacaoDetailComponent } from './layout/content/criar-operacao/operacao-detail/operacao-detail.component';
import { TipoMaquinaComponent } from './layout/content/tipo-maquina/tipo-maquina.component';
import { TipoMaquinaDetailComponent } from './layout/content/tipo-maquina/tipo-maquina-detail/tipo-maquina-detail.component';
import { MaquinaComponent } from './layout/content/maquina/maquina.component';
import { MaquinaDetailComponent } from './layout/content/maquina/maquina-detail/maquina-detail.component';
import { LinhaProducaoComponent } from './layout/content/linha-producao/linha-producao.component';
import { LinhaProducaoDetailComponent } from './layout/content/linha-producao/linha-producao-detail/linha-producao-detail.component';
import { ProdutoComponent } from './layout/content/produto/produto.component';
import { ProdutoDetailComponent } from './layout/content/produto/produto-detail/produto-detail.component';
import { VisualizacaoComponent } from './layout/content/visualizacao/visualizacao.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    CriarOperacaoComponent,
    FooterComponent,
    OperacaoDetailComponent,
    TipoMaquinaComponent,
    TipoMaquinaDetailComponent,
    MaquinaComponent,
    MaquinaDetailComponent,
    LinhaProducaoComponent,
    LinhaProducaoDetailComponent,
    ProdutoComponent,
    ProdutoDetailComponent,
    VisualizacaoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
