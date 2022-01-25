import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.126.0/build/three.module.js'

let camera, scene, renderer, dLight, aLight
let rect = 4
let xMax = 15
let x = - ( rect * xMax ) / 2
let z = 0

let collect = 1
let val = 0
const cnt = 2000
let currCnt = 0
const mat = new THREE.MeshStandardMaterial( {transparent: false, opacity: 0.5})
const box = new THREE.BoxGeometry( rect, 1, rect )
const mesh = new THREE.InstancedMesh( box, mat, cnt )

mesh.position.x = -rect*4
mesh.position.z = -20
mesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage )

init()
create()
animate()

function create() {

  val = getRnd()
  scene.add(mesh)

}

function init() {

  //renderer

  renderer = new THREE.WebGLRenderer( { antialias: true } )
  renderer.setPixelRatio( window.devicePixelRatio )
  renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.gammaFactor = 2.2
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.5
  
  document.body.appendChild( renderer.domElement )

  //scene

  scene = new THREE.Scene()
  scene.background = new THREE.Color( 1,1,1 )
  //scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 )
  scene.fog = new THREE.Fog( 0xFFD580, 10, 150 )

  //camera
  
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 1000 )
  camera.position.x = 0
  camera.position.y = 10
  camera.position.z = -100

  camera.lookAt(0,0,-1)
 
  //lights

  dLight = new THREE.DirectionalLight(  )
  dLight.position.set( 0, 1, -1  )
  dLight.intensity = 1
  
  scene.add( dLight )

  aLight = new THREE.AmbientLight(  )
  aLight.intensity = 1
  scene.add( aLight )

  window.addEventListener( 'resize', onWindowResize, false )

}


function animate () {
  requestAnimationFrame( animate )

  if ( val === getRnd() ) {
    collect ++
  } else {
    val = getRnd()
    collect = 1
  }

  const r = 255 
  const g =  Math.floor( ( 255 / collect ) )
  let a = r / 255
  let b = r

  const temp = new THREE.Object3D()
  temp.scale.set( 1, collect, 1 )
  temp.position.set( x, collect / 2, z )
  temp.updateMatrix()

  mesh.setMatrixAt( currCnt, temp.matrix )
  const color = new THREE.Color("rgb("+r+","+ g+"," + b + ")") 
  color.convertSRGBToLinear()
  mesh.setColorAt( currCnt, color )
  mesh.instanceColor.needsUpdate = true
  mesh.instanceMatrix.needsUpdate = true
  currCnt ++

  if ( currCnt > cnt ) {
    currCnt = 0
  }

  mesh.position.z -= rect/25

  // clone
  const o = scene.getObjectByName('clone')
  scene.remove(o)
  const clone = mesh.clone()
  clone.name = 'clone'
  clone.scale.y *= -1
  clone.position.y = 20
  scene.add(clone)

  // move cursor
  x += rect
  if ( x >= xMax * rect ) {
    z += rect
    x = - ( rect * xMax ) / 2
  }

  renderer.render( scene, camera )
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize( window.innerWidth, window.innerHeight )
  animate()
}

function getRnd() {
  return Date.now() % 2
}