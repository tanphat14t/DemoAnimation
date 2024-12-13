var camera, scene, renderer;
var mesh;

init();
animate();

function init() {
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
    alpha: true,
  });

  camera = new THREE.PerspectiveCamera(70, 1, 1, 100);
  camera.position.z = 25;

  scene = new THREE.Scene();

  var geometry = new THREE.SphereGeometry(10, 100, 100);
  var material = new THREE.MeshPhongMaterial();

  THREE.ImageUtils.crossOrigin = "";
  material.map = THREE.ImageUtils.loadTexture("/assets/images/earth.jpg"); //access on local
  // material.map = THREE.ImageUtils.loadTexture("earthAnimation//assets/images/earth.jpg"); //access on git

  mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x += 0.5;
  scene.add(mesh);

  const light = new THREE.DirectionalLight(0xffffff, 1); 
  light.position.set(0, 60, 40); 
  light.target.position.set(0, 0, 0); 
  scene.add(light);
  scene.add(light.target);
}

function resize() {
  var width = renderer.domElement.clientWidth;
  var height = renderer.domElement.clientHeight;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function animate() {
  resize();
  mesh.rotation.y += 0.005;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
