import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.136.0/build/three.module.js'
import { ToonShaderDotted } from 'https://cdn.jsdelivr.net/npm/three@0.136.0/examples/jsm/shaders/ToonShader.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.136.0/examples/jsm/controls/OrbitControls.js'

let camera, scene, renderer, dLight, aLight

init()
create()
animate()

function create() {

  //material

  const material = createShaderMaterial( ToonShaderDotted, dLight, aLight )


  //objects

  const poly = new THREE.DodecahedronGeometry(1,0)
  const mesh = new THREE.Mesh(poly, material)

  scene.add(mesh)

}

//src: https://github.com/mrdoob/three.js/blob/master/examples/webgl_marchingcubes.html#L182
function createShaderMaterial( shader, light, ambientLight ) {

			const u = THREE.UniformsUtils.clone( shader.uniforms )

			const vs = shader.vertexShader
			const fs = shader.fragmentShader

			const material = new THREE.ShaderMaterial( { uniforms: u, vertexShader: vs, fragmentShader: fs } )

			material.uniforms[ 'uDirLightPos' ].value = light.position
			material.uniforms[ 'uDirLightColor' ].value = light.color

			material.uniforms[ 'uAmbientLightColor' ].value = ambientLight.color

			return material 
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

