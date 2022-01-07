import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.126.0/build/three.module.js'
import { ToonShaderDotted, ToonShaderHatching } from 'https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/shaders/ToonShader.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/controls/OrbitControls.js'

let camera, scene, renderer, dLight, aLight, controls
const cnt = 10000

let sign = 1
let pX = 0

init()
create()
animate()



function create() {

  //material

  const obj = new THREE.DodecahedronGeometry( 0.8, 0 )
  //let mat = new THREE.MeshNormalMaterial({wireframe:true});
  //const mat = new THREE.MeshStandardMaterial( { flatShading:true, opacity:1 } )
  const mat = createShaderMaterial( ToonShaderHatching, dLight, aLight )

  //const mesh = new THREE.Mesh(obj, mat)
  //scene.add(mesh)
  
  const mesh = new THREE.Mesh(obj,mat)
  //mesh.castShadow = true
  //mesh.receiveShadow = true
  //scene.add(mesh);
  let group = new THREE.Group()
  scene.add(group)
  for ( let i = 0; i < cnt; i ++ ) {

    const m = mesh.clone()

    const x = getRandomArbitrary(-10,10)
    const y = getRandomArbitrary(-10,10)
    const z = getRandomArbitrary(-1,1)
    m.position.set(x,y,z)
    group.add(m)

  }
  

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
  scene.background = new THREE.Color( 1,1,1 )

  //camera
  
  camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 1, 1000 )
  camera.position.z = 8

  //controls = new OrbitControls(camera, renderer.domElement)

  
  //lights
  dLight = new THREE.DirectionalLight( 0xad33ef )
  dLight.position.set( 1, 1, 0  )
  dLight.intensity = 0.5
  scene.add( dLight )

  aLight = new THREE.AmbientLight( 0x202020 )
  aLight.intensity = 0.5
  scene.add( aLight )

  window.addEventListener( 'resize', onWindowResize, false )

}



function animate () {
  requestAnimationFrame( animate )

  if ( pX > 1 ) { 
    sign = -1
  }

  if ( pX < 0 ) {
    sign = 1
  }

  pX += 0.01 * sign

  //console.log(pX)

  //dLight.position.set( pX, 1, 0 )

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

