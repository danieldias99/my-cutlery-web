import * as THREE from '../threeBaseComponents/three.js';

let pointLight = new THREE.PointLight( 0xffffff, 0.5, 100000 );
let pointLight3 = new THREE.PointLight( 0xffffff, 0.5, 100000 );
pointLight.position.set(-60,50,0);
pointLight3.position.set(60,50,0);
let sphereSize = 10;
let pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize);
let pointLightHelper3 = new THREE.PointLightHelper( pointLight3, sphereSize);

let luzAcesa = {value: 2} // se luzAcesa for par está acesa se for impar não está

//botao luminosidade
export function onButtonClickLuminosidade() {
  if (luzAcesa.value % 2 != 0) acenderLuz(); else apagarLuz();
  }

let acenderLuz = () => {
  scene.add(pointLightHelper);
  scene.add(pointLightHelper3);
  scene.add(pointLight);
  scene.add(pointLight3);

  luzAcesa.value++;
}

let apagarLuz = () => {
  scene.remove(pointLightHelper);
  scene.remove(pointLightHelper3);
  scene.remove(pointLight);
  scene.remove(pointLight3);

  luzAcesa.value++;
}
/* FIM DA LUZ */
