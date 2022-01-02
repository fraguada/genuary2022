import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.136.0/build/three.module.js'
import { ToonShaderDotted } from 'https://cdn.jsdelivr.net/npm/three@0.136.0/examples/jsm/shaders/ToonShader.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.136.0/examples/jsm/controls/OrbitControls.js'

let camera, scene, renderer

init()
create()
animate()

function create() {
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
  
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 1000 )
  camera.position.z = 50

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

