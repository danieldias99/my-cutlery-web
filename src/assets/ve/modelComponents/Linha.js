import * as THREE from '../threeBaseComponents/three.js';
scene: THREE.Scene;

//Desenhar um tapete/linha - widget
var linhaTemp = [];

export var contTapetes = 0;
export var contTapetesTotal = 10;

var COMPRIMENTO_TAPETE = 50;
export var LARGURA_TAPETE = 5;

//botao criar linha producao
export function onButtonClickLP() {
    if (contTapetes <= contTapetesTotal) {
        desenhaLinha();
    } else {
        alert("Não é possivel criar mais linhas de produção!");
    }
  }
  
  //botao eliminar linha producao
  export function onButtonClickApagarLP() {
    if (contTapetes > 0) {
        apagarLinha();
    } else {
        alert("Não existe nenhuma linha de produção!");
    }
  }

var desenhaLinha = function () {
    if (contTapetes % 2 == 0) { //nr linhas par
        desenhaLinhaF(COMPRIMENTO_TAPETE, LARGURA_TAPETE, 1, 2 * contTapetes, 0); //linha grande
        desenhaLinhaF(LARGURA_TAPETE, LARGURA_TAPETE, 1, 2 * contTapetes + 1, 25 - LARGURA_TAPETE / 2);//Linha pequena direita
    } else { //nr linhas impar
        desenhaLinhaF(COMPRIMENTO_TAPETE, LARGURA_TAPETE, 1, 2 * contTapetes, 0); //linha grande
        desenhaLinhaF(LARGURA_TAPETE, LARGURA_TAPETE, 1, 2 * contTapetes + 1, - 25 + LARGURA_TAPETE / 2);//Linha pequena esquerda
    }
    contTapetes++;
}

var desenhaLinhaF = function (comprimento, largura, altura, posicaoLinhaZ, posicaoLinhaX) {
    var geometry_linha = new THREE.BoxGeometry(comprimento, largura, altura);
    var material = new THREE.MeshLambertMaterial({ color: '#089972' });
    geometry_linha.rotateX(Math.PI / 2);
    var descZ = -60 + (8 + (posicaoLinhaZ * largura) + largura / 2);
    geometry_linha.translate(posicaoLinhaX, 1, descZ);
    var linha = new THREE.Mesh(geometry_linha, material);
    scene.add(linha);
    linhaTemp.push(linha);
}

//Apagar um tapete/linha - widget
 var apagarLinha = function () {
    var linhaG = linhaTemp.pop();
    scene.remove(linhaG);
    var linhaP = linhaTemp.pop();
    scene.remove(linhaP);
    contTapetes--;
}
