import { Component, OnInit } from '@angular/core';

import '../../../../assets/ve/threeBaseComponents/GLTFLoader';
import '../../../../assets/ve/threeBaseComponents/OrbitControls';

import * as THREE from '../../../../assets/ve/threeBaseComponents/three.js';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.css']
})
export class VisualizacaoComponent implements OnInit {

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: THREE.OrbitControls;

  private cube: THREE.Mesh;

  //private : THREE.Mesh;

  ngOnInit() {
    this.init();
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

}
