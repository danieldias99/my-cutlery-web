var scene;

scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

//axis for help
var axisHelper = new THREE.AxesHelper(50);
scene.add(axisHelper);

var COMPRIMENTO_FABRICA = 80;
var LARGURA_FABRICA = 40;

var COMPRIMENTO_ARMAZENS = 20;

//calls de draw

var draw = function () {

    //factory
    walls(LARGURA_FABRICA, COMPRIMENTO_FABRICA, 20, 0, 20, Math.PI / 2, Math.PI / 2, 0x999966); //right wall
    walls(LARGURA_FABRICA, COMPRIMENTO_FABRICA, -20, 0, 20, Math.PI / 2, Math.PI / 2, 0x663300); //left wall
    walls(LARGURA_FABRICA, COMPRIMENTO_FABRICA / 2, 0, 0, -20, 0, 0, 0x993300); //back wall
    walls(LARGURA_FABRICA, COMPRIMENTO_FABRICA, 0, 20, 20, Math.PI / 2, 0, 0xffffff);//ceiling
    walls(LARGURA_FABRICA, COMPRIMENTO_FABRICA, 0, -20, 20, Math.PI / 2, 0);//floor

    //materias primas
    walls(COMPRIMENTO_ARMAZENS, LARGURA_FABRICA, LARGURA_FABRICA, -10, LARGURA_FABRICA, Math.PI / 2, Math.PI / 2, 0x999966);//right wall
    walls(COMPRIMENTO_ARMAZENS, 20, 30, -10, 20, 0, 0, 0x993300); //back wall
    walls(COMPRIMENTO_ARMAZENS, LARGURA_FABRICA, 30, 0, LARGURA_FABRICA, Math.PI / 2, 0, 0xffffff); //ceiling
    walls(COMPRIMENTO_ARMAZENS, LARGURA_FABRICA, 30, -20, LARGURA_FABRICA, Math.PI / 2, 0, 0xffffff); //floor

    //storage
    walls(COMPRIMENTO_ARMAZENS, LARGURA_FABRICA, -LARGURA_FABRICA, -10, LARGURA_FABRICA, Math.PI / 2, Math.PI / 2, 0x999966);//right wall
    walls(COMPRIMENTO_ARMAZENS, COMPRIMENTO_ARMAZENS, -30, -10, 20, 0, 0, 0x993300); //back wall
    walls(COMPRIMENTO_ARMAZENS, LARGURA_FABRICA, -30, 0, LARGURA_FABRICA, Math.PI / 2, 0, 0xffffff); //ceiling
    walls(COMPRIMENTO_ARMAZENS, LARGURA_FABRICA, -30, -20, LARGURA_FABRICA, Math.PI / 2, 0, 0xffffff); //floor

    //balcony
    desenharBalcoes();
}

//funções de draw
var walls = function (size_c, size_l, x, y, z, rotx, rotz, color_w) {
    var plane_geometry = new THREE.PlaneGeometry(size_c, size_l);
    var material = new THREE.MeshBasicMaterial({ color: color_w, side: THREE.DoubleSide });
    plane_geometry.rotateX(rotx);
    plane_geometry.rotateZ(rotz);
    plane_geometry.translate(x, y, z);
    var plane = new THREE.Mesh(plane_geometry, material);
    scene.add(plane);
}

//Draw a balcony

var ALTURA_BALCAO = 6;
var LARGURA_BALCAO = 2;

var desenharBalcoes = function () {
    desenhaBalcao(COMPRIMENTO_FABRICA, ALTURA_BALCAO, LARGURA_BALCAO, 19, -17, LARGURA_FABRICA / 2, Math.PI / 2); //balcao da direita
    desenhaBalcao(COMPRIMENTO_FABRICA, ALTURA_BALCAO, LARGURA_BALCAO, -19, -17, LARGURA_FABRICA / 2, Math.PI / 2)
}

var desenhaBalcao = function (comprimento, largura, altura, x, y, z, rotX) {
    var geometry_balcao = new THREE.BoxGeometry(comprimento, largura, altura);
    var material = new THREE.MeshBasicMaterial({ color: 0x993300 });
    geometry_balcao.rotateY(Math.PI / 2);
    geometry_balcao.translate(x, y, z);
    var linha = new THREE.Mesh(geometry_balcao, material);
    scene.add(linha);
}

//Draw Line - widget

var contTapetes = 0;
var contTapetesTotal = 8;

var COMPRIMENTO_TAPETE = 30;
var LARGURA_TAPETE = 3.785;

var desenhaLinha = function () {
    if (contTapetes % 2 == 0) { //nr linhas par
        desenhaLinhaF(COMPRIMENTO_TAPETE, LARGURA_TAPETE, 1, 2 * contTapetes, 0); //linha grande
        desenhaLinhaF(LARGURA_TAPETE, LARGURA_TAPETE, 1, 2 * contTapetes + 1, 15 - LARGURA_TAPETE / 2);//Linha pequena direita
    } else { //nr linhas impar
        desenhaLinhaF(COMPRIMENTO_TAPETE, LARGURA_TAPETE, 1, 2 * contTapetes, 0); //linha grande
        desenhaLinhaF(LARGURA_TAPETE, LARGURA_TAPETE, 1, 2 * contTapetes + 1, - 15 + LARGURA_TAPETE / 2);//Linha pequena esquerda
    }
}

var desenhaLinhaF = function (comprimento, largura, altura, posicaoLinhaZ, posicaoLinhaX) {
    var geometry_linha = new THREE.BoxGeometry(comprimento, largura, altura);
    var material = new THREE.MeshBasicMaterial({ color: 0x999966 });
    geometry_linha.rotateX(Math.PI / 2);
    var descZ = -20 + (8 + (posicaoLinhaZ * largura) + largura / 2);
    geometry_linha.translate(posicaoLinhaX, -17, descZ);
    var linha = new THREE.Mesh(geometry_linha, material);
    scene.add(linha);
}

//Delete Line - widget
var apagarLinha = function () {
    draw();

    /*contTapetesNovo = contTapetes - 1;
    contTapetes = 0;

    var i;
    for (i = 0; i < contTapetesNovo; i++) {
        desenhaLinha();
    }*/
}

desenhaLinha();
contTapetes++;
desenhaLinha();
apagarLinha();

var set_camera_init = function () {
    camera.position.z = 100;
    camera.position.y = 20;
}

var animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

var main = function () {
    draw();
    set_camera_init();
    animate();
}

main();