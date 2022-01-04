import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.126.0/build/three.module.js'

let scene, camera, renderer

let dMesh

init()
create()
animate()

function create() {

  //sky
  const cnt = 1000
  const obj = new THREE.DodecahedronGeometry(0.1, 0)
  const mat = new THREE.MeshStandardMaterial( { flatShading:true, opacity:1 } )
  const mesh = new THREE.InstancedMesh(obj,mat, cnt)
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  //let temp = new THREE.Object3D();
  for ( let i = 0; i < cnt; i ++ ) {

    const temp = new THREE.Object3D();

    const x = getRandomArbitrary(-100,100);
    const y = getRandomArbitrary(-100,100);
    const z = getRandomArbitrary(-100,100);
    temp.position.set(x,y,z);
    //temp.rotation.set(x,0,0);

    temp.updateMatrix(); 
    mesh.setMatrixAt( i, temp.matrix );

  }

  const dodecahedron = new THREE.DodecahedronGeometry(2, 2)
  const dMat = new THREE.MeshStandardMaterial({flatShading:true, roughness: 0.5, metalness:0.5})
  dMesh = new THREE.Mesh( dodecahedron, dMat )
  scene.add(dMesh)

  //dodecahedron
const cnt2 = 10000
const obj2 = new THREE.TetrahedronGeometry(0.1, 3);
										
const mat2 = new THREE.MeshStandardMaterial({flatShading:true, roughness:0.5, metalness: 0.5});
const mesh2 = new THREE.InstancedMesh(obj2,mat2, cnt2);
mesh2.castShadow = true;
mesh2.receiveShadow = true;
dMesh.add(mesh2);

for ( let i = 0; i < cnt2; i ++ ) {

  const temp2 = new THREE.Object3D(); 
	const d = getRandomArbitrary(1.5, 1.95); 
  const rY = getRandomArbitrary(0, 2);
  const pt = randomSpherePoint(0,0,0,d)
  temp2.position.set(pt[0], pt[1], pt[2]); 

  temp2.rotation.set(rY * Math.PI,0,0);

  temp2.updateMatrix(); 
  mesh2.setMatrixAt( i, temp2.matrix );

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
  //scene.background = new THREE.Color( 1,1,1 )

  //camera
  
  camera = new THREE.PerspectiveCamera( 30, window.innerWidth/window.innerHeight, 1, 1000 )
  camera.position.set(0,2,2)
  
  //lights
  const light = new THREE.DirectionalLight()
  light.position.set( 10, 10, 10 )
  light.intensity = 0.6
  light.castShadow = true
  scene.add( light )

  //lights
  const light2 = new THREE.DirectionalLight( 0x1aa7ec )
  light2.position.set( 5, 1, 0 )
  light2.intensity = 0.5
  light2.castShadow = true
  scene.add( light2 )

  const aLight = new THREE.AmbientLight( 0x6305dc )
  aLight.intensity = 0.2
  scene.add(aLight)

  window.addEventListener( 'resize', onWindowResize, false )

}

function animate () {
  requestAnimationFrame( animate )
  dMesh.rotation.x += 0.001
  renderer.render( scene, camera )
}
  
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize( window.innerWidth, window.innerHeight )
  animate()
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

//src: https://stackoverflow.com/a/15048260/2179399
/*
Returns a random point of a sphere, evenly distributed over the sphere.
The sphere is centered at (x0,y0,z0) with the passed in radius.
The returned point is returned as a three element array [x,y,z]. 
*/
function randomSpherePoint(x0,y0,z0,radius){
  var u = Math.random();
  var v = Math.random();
  var theta = 2 * Math.PI * u;
  var phi = Math.acos(2 * v - 1);
  var x = x0 + (radius * Math.sin(phi) * Math.cos(theta));
  var y = y0 + (radius * Math.sin(phi) * Math.sin(theta));
  var z = z0 + (radius * Math.cos(phi));
  return [x,y,z];
}
