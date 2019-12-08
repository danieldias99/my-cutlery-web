import { Component, OnInit } from '@angular/core';

import '../../../../assets/ve/threeBaseComponents/GLTFLoader';
import '../../../../assets/ve/threeBaseComponents/OrbitControls';

import * as THREE from '../../../../assets/ve/threeBaseComponents/three.js';
import { LinhaProducaoService } from 'src/app/core/services/linha-producao/linha-producao.service';
import { LinhaProducao } from 'src/app/core/models/linha-producao';
import { Router } from '@angular/router';



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

  allLinhasProducao: LinhaProducao[];
  allLinhasProducaoDESENHO: any[];
  statusMessage: string;

  //private : THREE.Mesh;
  constructor(private router: Router, private linhaProducaoSrv: LinhaProducaoService) { 
    this.allLinhasProducaoDESENHO = new Array();
  }

  ngOnInit() {
    this.init();
    this.luz();
    this.getLinhasProducao();
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

}
