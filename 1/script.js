import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.136.0/build/three.module.js'

let scene, camera, renderer

init()
create()
animate()

function create() {
  const obj = new THREE.DodecahedronGeometry(2, 0);
//let mat = new THREE.MeshNormalMaterial({wireframe:true});
const mat = new THREE.MeshStandardMaterial({flatShading:true, opacity:1});
const mesh = new THREE.InstancedMesh(obj,mat, 10000);
mesh.castShadow = true;
mesh.receiveShadow = true;
scene.add(mesh);
//let temp = new THREE.Object3D();
for ( let i = 0; i < 10000; i ++ ) {

  const temp = new THREE.Object3D();

  const x = getRandomArbitrary(-10,10);
  const y = getRandomArbitrary(-10,10);
  const z = getRandomArbitrary(-10,10);
  temp.position.set(x,y,z);
  //temp.rotation.set(x,0,0);

  temp.updateMatrix(); 
  mesh.setMatrixAt( i, temp.matrix );

}

}

function init() {

  //renderer

  renderer = new THREE.WebGLRenderer( { antialias: true } )
  renderer.setPixelRatio( window.devicePixelRatio )
  renderer.setSize( window.innerWidth, window.innerHeight )
  document.body.appendChild( renderer.domElement )

  //scene

  scene = new THREE.Scene()
  scene.background = new THREE.Color( 1,1,1 )

  //camera
  
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 1000 )
  camera.position.z = 50

  //lights
  dLight = new THREE.DirectionalLight()
  scene.add( dLight )

  aLight = new THREE.AmbientLight()
  scene.add( aLight )

  window.addEventListener( 'resize', onWindowResize, false )

}

function animate () {
  requestAnimationFrame( animate )
  renderer.render( scene, camera )
}
  
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize( window.innerWidth, window.innerHeight )
  animate()
}

function update( event ) {
//mesh.rotation.y += 0.001;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
