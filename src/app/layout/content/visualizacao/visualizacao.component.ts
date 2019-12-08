import { Component, OnInit } from '@angular/core';

import '../../../../assets/ve/threeBaseComponents/GLTFLoader';
import '../../../../assets/ve/threeBaseComponents/OrbitControls';

import * as THREE from '../../../../assets/ve/threeBaseComponents/three.js';
import { LinhaProducaoService } from 'src/app/core/services/linha-producao/linha-producao.service';
import { LinhaProducao } from 'src/app/core/models/linha-producao';
import { Router } from '@angular/router';
import { Maquina } from 'src/app/core/models/maquina.model';
import { MaquinaService } from 'src/app/core/services/maquina/maquina.service';



@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.css']
})
export class VisualizacaoComponent implements OnInit {

  public scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: THREE.OrbitControls;
  private pointLight: THREE.PointLight;
  private pointLight3: THREE.PointLight;
  private sphereSize = 10;
  private pointLightHelper: THREE.PointLightHelper;
  private pointLightHelper3: THREE.PointLightHelper;
  private luzAcesa = 1;
  private contTapetes = 0;
  private contTapetesTotal = 10;
  private COMPRIMENTO_TAPETE = 50;
  private LARGURA_TAPETE = 5;
  private allLinhasProducao: LinhaProducao[];
  private allLinhasProducaoDESENHO: any[];
  private statusMessage: string;
  private allMaquinas: Maquina[];
  private maquinasDESENHO: any[];
  private contTapetesPreenchidos = 0;
  private contMaquinas = 0;
  private contMaquinasTotal = 0;
  private TAMANHO_MAQUINA = 4.5;
  private MACHINE_SPACE = 8;
  private LARGURA_FABRICA = 40;

  //private : THREE.Mesh;
  constructor(private router: Router, private linhaProducaoSrv: LinhaProducaoService,
    private maquinaSrv: MaquinaService) {
    this.allLinhasProducaoDESENHO = new Array();
    this.maquinasDESENHO = new Array();
  }

  ngOnInit() {
    this.init();
    this.luz();
    this.getLinhasProducao();
    this.getMaquinas();
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.scene.add(this.camera);
    this.scene.add(new THREE.AxisHelper(20));

    this.camera.position.set(0, 0, 0);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.camera.position.z = 100;
    this.camera.position.y = 20;

    var controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

    let gltfLoader = new THREE.GLTFLoader(); // Loader for Lamps
    let source = '../../../../assets/ve/importedModels/warehouse/scene.gltf'; // resource url
    let onLoad = (gltf, position) => {
      const model = gltf.scene.children[0];
      model.scale.set(0.1, 0.1, 0.1);
      model.position.set(-40, 0, 80);
      console.log(model);
      this.scene.add(model);
    }; // called to load resource
    let loadingBuffer = (timer) => {
      console.log((timer.loaded / timer.total * 100) + '% loaded');
    } // called while loading
    let loaderError = (error) => {
      console.log('Error happened');
    } // When error is found
    let warehousePosition = new THREE.Vector3(0, 0, 0);
    gltfLoader.load(source, gltf => onLoad(gltf, warehousePosition), loadingBuffer, loaderError);

    this.render();

  }

  render() {

    let self: VisualizacaoComponent = this;

    (function render() {
      requestAnimationFrame(render);
      self.renderer.render(self.scene, self.camera);
    }());

  }

  //-----------------------------------------Luminosidade------------------------------------------------------
  //botao luminosidade
  luminosidade(): void {
    if (this.luzAcesa % 2 != 0) {
      this.acenderLuz();
    } else {
      this.apagarLuz();
    }
  }

  luz() {
    this.pointLight = new THREE.PointLight(0xffffff, 0.5, 100000);
    this.pointLight3 = new THREE.PointLight(0xffffff, 0.5, 100000);
    this.pointLight.position.set(-60, 50, 0);
    this.pointLight3.position.set(60, 50, 0);
    this.sphereSize = 10;
    this.pointLightHelper = new THREE.PointLightHelper(this.pointLight, this.sphereSize);
    this.pointLightHelper3 = new THREE.PointLightHelper(this.pointLight3, this.sphereSize);
    this.acenderLuz();
  }

  // se luzAcesa for par está acesa se for impar não está
  acenderLuz() {
    this.scene.add(this.pointLightHelper);
    this.scene.add(this.pointLightHelper3);
    this.scene.add(this.pointLight);
    this.scene.add(this.pointLight3);

    this.luzAcesa++;
  }

  apagarLuz() {
    this.scene.remove(this.pointLightHelper);
    this.scene.remove(this.pointLightHelper3);
    this.scene.remove(this.pointLight);
    this.scene.remove(this.pointLight3);

    this.luzAcesa++;
  }

  //-------------------------------------------Linha de producao------------------------------------------------

  //botao criar linha producao
  criarLinha() {
    var c = document.getElementsByTagName("canvas");
    c[0].parentNode.removeChild(c[0]);
    this.router.navigate(['/linhas-producao']);
    if (this.contTapetes <= this.contTapetesTotal) {
      this.desenhaLinha();
    } else {
      alert("Não é possivel criar mais linhas de produção!");
    }
  }

  //botao eliminar linha producao
  eliminarLinha() {
    if (this.contTapetes > 0) {
      this.apagarLinha();
    } else {
      alert("Não existe nenhuma linha de produção!");
    }
  }

  private getLinhasProducao(): void {
    this.linhaProducaoSrv.getLinhasProducao().subscribe(
      data => {
        console.log(data);
        this.allLinhasProducao = data;
        this.allLinhasProducao.forEach(element => {
          this.desenhaLinha();
        });
      },
      error => { this.statusMessage = "Error: Service Unavailable" });
  }

  private desenhaLinha() {
    this.desenhaLinhaF(this.COMPRIMENTO_TAPETE, this.LARGURA_TAPETE, 1, 2 * this.contTapetes, 0);
    this.contTapetes++;
  }

  private desenhaLinhaF(comprimento, largura, altura, posicaoLinhaZ, posicaoLinhaX) {
    var geometry_linha = new THREE.BoxGeometry(comprimento, largura, altura);
    var material = new THREE.MeshLambertMaterial({ color: '#089972' });
    geometry_linha.rotateX(Math.PI / 2);
    var descZ = -60 + (8 + (posicaoLinhaZ * largura) + largura / 2);
    geometry_linha.translate(posicaoLinhaX, 1, descZ);
    var linha = new THREE.Mesh(geometry_linha, material);
    this.scene.add(linha);
    this.allLinhasProducaoDESENHO.push(linha);
  }

  //Apagar um tapete/linha - widget
  private apagarLinha() {
    var linhaP = this.allLinhasProducao.pop();
    var linhaPR = this.allLinhasProducaoDESENHO.pop();
    this.scene.remove(linhaPR);
    this.contTapetes--;
    this.delete(linhaP);
  }

  private delete(LinhaProducao: LinhaProducao): void {
    this.allLinhasProducao = this.allLinhasProducao.filter(h => h !== LinhaProducao);
    this.linhaProducaoSrv.deleteLinhaProducao(LinhaProducao.id).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  //------------------------------------------Maquina--------------------------------------------------
  //botao criar maquina
  criarMaquina(): void {
    var c = document.getElementsByTagName("canvas");
    c[0].parentNode.removeChild(c[0]);
    this.router.navigate(['/maquinas']);
    if (this.contTapetesPreenchidos <= this.contTapetesTotal && this.contTapetesPreenchidos < this.contTapetes && this.contTapetes != 0) {
      this.desenhaMaquinas();
    } else if (this.contTapetes == 0) {
      alert("Não existem linhas de produção criadas, logo não é possível acrescentar máquinas. Crie uma linha de produção primeiro!");
    } else {
      alert("Não é possivel criar mais máquinas!");
    }
  }

  //botao eliminar maquina
  apagarMaquina(): void {
    if (this.contMaquinasTotal > 0) {
      this.apagarMqn();
    } else {
      alert("Não existe nenhuma máquina!");
    }
  }

  private getMaquinas(): void {
    this.maquinaSrv.getMaquinas().subscribe(
      data => {
        console.log(data);
        this.allMaquinas = data;
        this.allMaquinas.forEach(element => {
          this.desenhaMaquinas();
        })
      },
      error => { this.statusMessage = "Error: Service Unavailable" });
  }

  private desenhaMaquina(size_m, x, y, z) {
    var geometry_balcao = new THREE.BoxGeometry(size_m, size_m, size_m);
    var material = new THREE.MeshLambertMaterial({ color: '#e70861' });
    geometry_balcao.translate(x, y, z);
    var maquina = new THREE.Mesh(geometry_balcao, material);
    var geometry_retangulo = new THREE.BoxGeometry(1, 12, 1);
    geometry_retangulo.translate(x, y + 4, z - 2);
    var retangulo = new THREE.Mesh(geometry_retangulo, material);
    this.scene.add(retangulo);
    var geometry_retangulo1 = new THREE.BoxGeometry(1, 1, 3);
    geometry_retangulo1.translate(x, y + 10, z - 1);
    var retangulo1 = new THREE.Mesh(geometry_retangulo1, material);
    this.scene.add(retangulo1);
    var geometry_cone = new THREE.ConeBufferGeometry(2, 4, 6);
    geometry_cone.rotateZ((Math.PI / 2) - 5);
    geometry_cone.rotateY(Math.PI / 2);
    geometry_cone.translate(x, y + 8, z + 0.5);
    var cone = new THREE.Mesh(geometry_cone, material);
    this.scene.add(cone);
    this.scene.add(maquina);
    this.maquinasDESENHO.push(maquina);
    this.maquinasDESENHO.push(retangulo);
    this.maquinasDESENHO.push(retangulo1);
    this.maquinasDESENHO.push(cone);
  }

  private desenhaMaquinas() {
    switch (this.contMaquinas) {
      case 0:
        this.desenhaMaquina(this.TAMANHO_MAQUINA, - this.LARGURA_FABRICA / 2 + (this.MACHINE_SPACE + (this.contMaquinas * (this.TAMANHO_MAQUINA + this.MACHINE_SPACE))), 1, - 80 + this.LARGURA_FABRICA / 2 + (8 + (2 * this.contTapetesPreenchidos * this.LARGURA_TAPETE) - this.TAMANHO_MAQUINA / 2)); //primeiras maquinas
        this.contMaquinas++;
        this.contMaquinasTotal++;
        break;
      case 1:
        this.desenhaMaquina(this.TAMANHO_MAQUINA, - this.LARGURA_FABRICA / 2 + (this.MACHINE_SPACE + (this.contMaquinas * (this.TAMANHO_MAQUINA + this.MACHINE_SPACE))), 1, - 80 + this.LARGURA_FABRICA / 2 + (8 + (2 * this.contTapetesPreenchidos * this.LARGURA_TAPETE) - this.TAMANHO_MAQUINA / 2)); //segundas maquinas
        this.contMaquinas++;
        this.contMaquinasTotal++;
        break;
      default:
        this.desenhaMaquina(this.TAMANHO_MAQUINA, - this.LARGURA_FABRICA / 2 + (this.MACHINE_SPACE + (this.contMaquinas * (this.TAMANHO_MAQUINA + this.MACHINE_SPACE))), 1, - 80 + this.LARGURA_FABRICA / 2 + (8 + (2 * this.contTapetesPreenchidos * this.LARGURA_TAPETE) - this.TAMANHO_MAQUINA / 2));// terceiras maquinas
        this.contTapetesPreenchidos++;
        this.contMaquinas = 0;
        this.contMaquinasTotal++;
    }
  }

  //Apagar uma maquina - widget
  private apagarMqn() {
    var maquina = this.maquinasDESENHO.pop();
    var mqn = this.allMaquinas.pop();
    var r = this.maquinasDESENHO.pop();
    var re = this.maquinasDESENHO.pop();
    var ret = this.maquinasDESENHO.pop();
    this.deleteMqn(mqn);
    this.scene.remove(maquina);
    this.scene.remove(r);
    this.scene.remove(re);
    this.scene.remove(ret);
    this.contMaquinasTotal--;
    if (this.contMaquinas == 0) {
      this.contMaquinas = 2;
      this.contTapetesPreenchidos--;
    } else {
      this.contMaquinas--;
    }
  }

  private deleteMqn(maquina: Maquina): void {
    this.allMaquinas = this.allMaquinas.filter(h => h !== maquina);
    this.maquinaSrv.deleteMaquina(maquina.id).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
}
