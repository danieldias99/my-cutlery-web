import { Component, OnInit, Input } from '@angular/core';

import '../../../../assets/ve/threeBaseComponents/GLTFLoader';
import '../../../../assets/ve/threeBaseComponents/OrbitControls';

import * as THREE from '../../../../assets/ve/threeBaseComponents/three.js';
import Clock from '../../../../assets/ve/threeBaseComponents/Clock.js';
import { LinhaProducaoService } from 'src/app/core/services/linha-producao/linha-producao.service';
import { LinhaProducao } from 'src/app/core/models/linha-producao';
import { Router } from '@angular/router';
import { Maquina } from 'src/app/core/models/maquina.model';
import { MaquinaService } from 'src/app/core/services/maquina/maquina.service';
import { PickHelper } from '../../../../assets/ve/auxiliars/PickHelper';
import { PlaneamentoProdutoService } from 'src/app/core/services/planeamento-produto/planeamento-produto.service';
import { PlaneamentoProducaoMock } from 'src/app/core/moks/PlaneamentoProducaoMock';


@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.css']
})
export class VisualizacaoComponent implements OnInit {

  @Input() MENSSAGEM;

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
  public allLinhasProducao: LinhaProducao[];
  public allLinhasProducaoDESENHO: THREE.Mech[];
  private statusMessage: string;
  private allMaquinas: Maquina[];
  private maquinasDESENHO: any[];
  public produtosDESENHO: any[];
  private contMaquinasTotal = 0;
  private TAMANHO_MAQUINA = 4.5;
  private MACHINE_SPACE = 8;
  private LARGURA_FABRICA = 40;
  private texturaTapete: THREE.TextureLoader;
  private canvas: any;
  private pickPosition;
  private pickHelper;
  private timer: any;

  //private : THREE.Mesh;
  constructor(private router: Router, private linhaProducaoSrv: LinhaProducaoService,
    private maquinaSrv: MaquinaService,
    private planeamentoProducaoSrv: PlaneamentoProdutoService) {
    this.allLinhasProducaoDESENHO = new Array();
    this.maquinasDESENHO = new Array();
    this.produtosDESENHO = new Array();
    this.timer = new THREE.Clock();
  }

  ngOnInit() {
    this.main();
    this.luz();

  }

  main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 60;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 200;
    const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 100;
    camera.position.y = 20;
    var controls = new THREE.OrbitControls(camera, renderer.domElement);


    const scene = new THREE.Scene();
    scene.add(camera);

    //Draw Fabrica
    this.texturaTapete = new THREE.TextureLoader().load("../../../../assets/ve/importedModels/TexturaLinha/linha.png");

    let gltfLoader = new THREE.GLTFLoader(); // Loader for Lamps
    let source = '../../../../assets/ve/importedModels/warehouse/scene.gltf'; // resource url
    let onLoad = (gltf, position) => {
      const model = gltf.scene.children[0];
      model.scale.set(0.1, 0.1, 0.1);
      model.position.set(-40, 0, 80);
      console.log(model);
      scene.add(model);
    }; // called to load resource
    let loadingBuffer = (timer) => {
      console.log((timer.loaded / timer.total * 100) + '% loaded');
    } // called while loading
    let loaderError = (error) => {
      console.log('Error happened: ' + error);
    } // When error is found
    let warehousePosition = new THREE.Vector3(0, 0, 0);
    gltfLoader.load(source, gltf => onLoad(gltf, warehousePosition), loadingBuffer, loaderError);

    this.getLinhasMaquinas();

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    const pickPosition = { x: 0, y: 0 };
    const pickHelper = new PickHelper();
    clearPickPosition();

    function render(time) {

      time *= 0.001;  // convert to seconds;

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      //cameraPole.rotation.y = time * .1;

      //const objectPicked = pickHelper.pick(pickPosition, scene, camera, time);

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    function getCanvasRelativePosition(event) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }

    function setPickPosition(event) {
      const pos = getCanvasRelativePosition(event);
      pickPosition.x = (pos.x / canvas.clientWidth) * 2 - 1;
      pickPosition.y = (pos.y / canvas.clientHeight) * -2 + 1;  // note we flip Y
    }

    function clearPickPosition() {
      // unlike the mouse which always has a position
      // if the user stops touching the screen we want
      // to stop picking. For now we just pick a value
      // unlikely to pick something
      pickPosition.x = -100000;
      pickPosition.y = -100000;
    }


    window.addEventListener('mousemove', setPickPosition);
    window.addEventListener('mouseout', clearPickPosition);
    window.addEventListener('mouseleave', clearPickPosition);


    window.addEventListener('touchstart', (event) => {
      // prevent the window from scrolling
      event.preventDefault();
      setPickPosition(event.touches[0]);
    }, { passive: false });

    window.addEventListener('touchmove', (event) => {
      setPickPosition(event.touches[0]);
    });

    window.addEventListener('touchend', clearPickPosition);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.pickHelper = pickHelper;
    this.pickPosition = pickPosition;

    this.render();

  }

  render() {

    let self: VisualizacaoComponent = this;

    (function render() {
      requestAnimationFrame(render);
      self.texturaTapete.offset.x += 0.01;
      const time = 0.5;

      const objectPicked = self.pickHelper.pick(self.pickPosition, self.scene, self.camera, time);

      self.renderer.render(self.scene, self.camera);

      if (objectPicked !== undefined && objectPicked.type === 'Mesh' || objectPicked !== undefined && objectPicked.name === 'Scene') {

        var index = self.allLinhasProducaoDESENHO.findIndex(i => i === objectPicked);

        if (index >= 0) {

          const objectBD = self.allLinhasProducao[index];

          console.log(objectBD);

          self.showToolTipLinhas(objectBD, objectPicked);
        } else {
          index = self.maquinasDESENHO.findIndex(i => i === objectPicked);

          const objectBD = self.allMaquinas[index];

          console.log(objectBD);

          self.showToolTipMaquinas(objectBD, objectPicked);
        }
      } else {
        self.hideToolTip();
      }
    }());

  }

  showToolTipLinhas(objectBD, objectPicked) {
    this.MENSSAGEM = this.toInfoToolTipStringLinhas(objectBD);
    var d = document.getElementById('tooltip');
    d.style.position = "absolute";
    d.style.color = 'white';
    d.style.background = 'grey';
    d.style.opacity = '1';
    d.style.left = objectPicked.x + 'px';
    d.style.top = objectPicked.y + 'px';
  }

  toInfoToolTipStringLinhas(objectBD): String {
    var maquinasS;
    objectBD.maquinas.forEach(element => {
      maquinasS = maquinasS + element.nomeMaquina + "; ";
    });
    return "Descrição: " + objectBD.descricao + "; "
      + "Coordenada x: " + objectBD.posicao_x + "; "
      + "Coordenada y: " + objectBD.posicao_y + "; "
      + "Orientação: " + objectBD.orientacao + "; "
      + "Comprimento: " + objectBD.comprimento + "; "
      + "Largura: " + objectBD.largura + "; "
      + "Maquinas: " + maquinasS
  }

  showToolTipMaquinas(objectBD, objectPicked) {
    this.MENSSAGEM = this.toInfoToolTipStringMaquinas(objectBD);
    var d = document.getElementById('tooltip');
    d.style.position = "absolute";
    d.style.color = 'white';
    d.style.background = 'grey';
    d.style.opacity = '1';
    d.style.left = objectPicked.x + 'px';
    d.style.top = objectPicked.y + 'px';
  }

  toInfoToolTipStringMaquinas(objectBD): String {
    return "Nome: " + objectBD.nomeMaquina + "; "
      + "Marca: " + objectBD.marcaMaquina + "; "
      + "Modelo: " + objectBD.modeloMaquina + "; "
      + "Posição Relativa: " + objectBD.posicaoRelativa + "; "
      + "Tipo de Máquina: " + this.setTipoMaquina(objectBD.id_tipoMaquina) + "; "
      + "Linha de Produção: " + objectBD.id_linhaProducao;
  }

  setTipoMaquina(id_tipoMaquina: string): string {
    return "Furadora";
    /*if (id_tipoMaquina === '1') {
      return "Furadora";
    } else {
      return "Ainda a definir";
    }*/
  }

  hideToolTip() {
    var d = document.getElementById('tooltip');
    d.style.opacity = '0';
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
    if (this.contTapetes <= this.contTapetesTotal) {
      var c = document.getElementsByTagName("canvas");
      c[0].parentNode.removeChild(c[0]);
      this.router.navigate(['/linhas-producao']);
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

  private getLinhasMaquinas(): void {
    this.linhaProducaoSrv.getLinhasProducao().subscribe(
      data => {
        console.log(data);
        this.allLinhasProducao = data;
        this.allLinhasProducao.forEach(element => {
          this.desenhaLinhaF(element.comprimento, element.largura, 1, element.posicao_y, element.posicao_x);
        }),
          this.maquinaSrv.getMaquinas().subscribe(
            dat => {
              console.log(dat);
              this.allMaquinas = dat;
              this.allMaquinas.forEach(element => {
                this.desenhaMaquinas(element, element.posicaoRelativa, element.id_linhaProducao);
              });
            },
            error => { this.statusMessage = "Error: Service Unavailable" });
      },
      error => { this.statusMessage = "Error: Service Unavailable" });
  }

  private desenhaLinhaF(comprimento, largura, altura, posicaoLinhaZ, posicaoLinhaX) {
    var geometry_linha = new THREE.BoxGeometry(comprimento, largura, altura);
    geometry_linha.rotateX(Math.PI / 2);
    var descZ = -60 + (8 + (posicaoLinhaZ * largura) + largura / 2);
    geometry_linha.translate(posicaoLinhaX, 1, descZ);
    this.texturaTapete.wrapS = THREE.RepeatWrapping;
    this.texturaTapete.wrapT = THREE.RepeatWrapping;
    this.texturaTapete.repeat.set(6, 1);
    const material = new THREE.MeshLambertMaterial({ map: this.texturaTapete });
    var linha = new THREE.Mesh(geometry_linha, material);
    this.scene.add(linha);
    this.allLinhasProducaoDESENHO.push(linha);
    this.contTapetes++;
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
    if (this.contTapetes != 0) {
      var c = document.getElementsByTagName("canvas");
      c[0].parentNode.removeChild(c[0]);
      this.router.navigate(['/maquinas']);
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

  private desenhaMaquina(path, x, y, z) {
    let gltfLoader = new THREE.GLTFLoader(); // Loader for Lamps
    let source = '../../../../assets/ve/importedModels/Maquinas/' + path; // resource url
    let onLoad = (gltf, position) => {
      const model = gltf.scene;
      model.position.set(x, y, z - 1);
      model.rotation.set(0, -20.40, 0);
      console.log(model);
      this.scene.add(model);
      this.maquinasDESENHO.push(model);
    }; // called to load resource
    let loadingBuffer = (timer) => {
      console.log((timer.loaded / timer.total * 100) + '% loaded');
    } // called while loading
    let loaderError = (error) => {
      console.log('Error happened: ' + error);
    } // When error is found
    let warehousePosition = new THREE.Vector3(0, 0, 0);
    gltfLoader.load(source, gltf => onLoad(gltf, warehousePosition), loadingBuffer, loaderError);
  }

  private desenhaMaquinas(maquina: Maquina, posicao, linhaProducao) {
    var linha = this.allLinhasProducao.find(i => i.id === linhaProducao);
    var descZ = -60 + (8 + (parseInt(linha.posicao_y) * parseInt(linha.largura)) + parseInt(linha.largura) / 2);
    if (maquina.id_tipoMaquina == "1") {
      this.desenhaMaquina('FuradoraMecanica1/FuradoraMecanica1.gltf', (parseInt(linha.posicao_x) - ((parseInt(linha.comprimento) / 2) - 6)) + (((parseInt(linha.comprimento) / 2) - 6) * (posicao - 1)), 3, descZ - parseInt(linha.largura) / 2 - this.TAMANHO_MAQUINA / 2);
    } else if (maquina.id_tipoMaquina == "2") {
      this.desenhaMaquina('EsmagadoraPrensa1/EsmagadoraPrensa1.gltf', (parseInt(linha.posicao_x) - ((parseInt(linha.comprimento) / 2) - 6)) + (((parseInt(linha.comprimento) / 2) - 6) * (posicao - 1)), 3, descZ - parseInt(linha.largura) / 2 - this.TAMANHO_MAQUINA / 2);
    } else if (maquina.id_tipoMaquina == "3") {
      this.desenhaMaquina('Forno/Forno.gltf', (parseInt(linha.posicao_x) - ((parseInt(linha.comprimento) / 2) - 6)) + (((parseInt(linha.comprimento) / 2) - 6) * (posicao - 1)), 6, descZ - parseInt(linha.largura) / 2 - this.TAMANHO_MAQUINA / 2);
    } else {
      //Quadrado
      alert('Sem modelo correspondente!');
    }

    this.contMaquinasTotal++;
  }

  //Apagar uma maquina - widget
  private apagarMqn() {
    var maquina = this.maquinasDESENHO.pop();
    var mqn = this.allMaquinas.pop();
    this.deleteMqn(mqn);
    this.scene.remove(maquina);
    this.contMaquinasTotal--;
  }

  private deleteMqn(maquina: Maquina): void {
    this.allMaquinas = this.allMaquinas.filter(h => h !== maquina);
    this.maquinaSrv.deleteMaquina(maquina.id).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  planeamentoProducao() {
    var planeamento_producao = new PlaneamentoProducaoMock();

    var time_to_go = 0;
    planeamento_producao.tarefas.forEach(tarefa => {
      console.log(this.timer.getDelta());
      while (this.timer.oldTime < time_to_go) {
        //loop infinito
        this.timer.getDelta();
      }

      time_to_go = time_to_go + 3000;

      var linha = this.allLinhasProducao.find(l => l.id == tarefa.linha);
      var linhaIndex = this.allLinhasProducao.findIndex(l => l.id == tarefa.linha);
      var maquina = linha.maquinas.find(m => m.id_tipoMaquina == tarefa.maquina);
      var indexMaquina = 3 * (parseInt(maquina.posicaoRelativa) - 1) + linhaIndex;
      var maquinaMesh = this.getMeshByIndex(indexMaquina);

      if (tarefa.ferramenta == 'Furadora Mecanica') {
        this.desenhaMaquina1('FuradoraMecanica1/FuradoraMecanica1.gltf', maquinaMesh.position.x, maquinaMesh.position.y, maquinaMesh.position.z, indexMaquina);
      } else if (tarefa.ferramenta == 'Furadora Laiser') {
        this.desenhaMaquina1('FuradoraLaser1/FuradoraLaser1.gltf', maquinaMesh.position.x, maquinaMesh.position.y, maquinaMesh.position.z, indexMaquina);
      } else if (tarefa.ferramenta == 'Prensa Quadrada') {
        this.desenhaMaquina1('EsmagadoraPrensa1/EsmagadoraPrensa1.gltf', maquinaMesh.position.x, maquinaMesh.position.y, maquinaMesh.position.z, indexMaquina);
      } else if (tarefa.ferramenta == 'Prensa Redonda') {
        this.desenhaMaquina1('EsmagadoraRedonda1/EsmagadoraRedonda1.gltf', maquinaMesh.position.x, maquinaMesh.position.y, maquinaMesh.position.z, indexMaquina);
      } else if (tarefa.ferramenta == 'Aquecedor') {
        this.desenhaMaquina1('Forno/Forno.gltf', maquinaMesh.position.x, maquinaMesh.position.y + 5, maquinaMesh.position.z, indexMaquina);
      }

      this.drawProduto(maquinaMesh.position.x, maquinaMesh.position.y, maquinaMesh.position.z);

      this.scene.remove(maquinaMesh);

    });
  }

  drawProduto(x, y, z) {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y + 4, z + 1);
    this.scene.add(cube);
    this.produtosDESENHO.push(cube);
  }

  getMeshByIndex(indexMaquina: number) {
    return this.maquinasDESENHO[indexMaquina];
  }

  private desenhaMaquina1(path, x, y, z, index) {
    let gltfLoader = new THREE.GLTFLoader(); // Loader for Lamps
    let source = '../../../../assets/ve/importedModels/Maquinas/' + path; // resource url
    let onLoad = (gltf, position) => {
      const model = gltf.scene;
      model.position.set(x, y, z - 1);
      model.rotation.set(0, -20.40, 0);
      console.log(model);
      this.scene.add(model);
      this.maquinasDESENHO[index] = model;
    }; // called to load resource
    let loadingBuffer = (timer) => {
      console.log((timer.loaded / timer.total * 100) + '% loaded');
    } // called while loading
    let loaderError = (error) => {
      console.log('Error happened: ' + error);
    } // When error is found
    let warehousePosition = new THREE.Vector3(0, 0, 0);
    gltfLoader.load(source, gltf => onLoad(gltf, warehousePosition), loadingBuffer, loaderError);
  }

}
