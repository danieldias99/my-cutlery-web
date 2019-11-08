var scene;

var player = { height: 1.8 };
scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

var floor = function () {
    var plane_geometry = new THREE.PlaneGeometry(60, 25);
    var material = new THREE.MeshBasicMaterial({ color: 0x858585, side: THREE.DoubleSide });
    plane_geometry.rotateX(15);
    var plane = new THREE.Mesh(plane_geometry, material);
    scene.add(plane);
}

floor();

var set_camera_init = function () {
    camera.position.z = 25;
}

set_camera_init();

var animate = function () {
    requestAnimationFrame(animate);

    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};
animate();