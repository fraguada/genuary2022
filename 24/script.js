import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.126.0/build/three.module.js'
import { ToonShaderDotted, ToonShaderHatching } from 'https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/shaders/ToonShader.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/controls/OrbitControls.js'

let val, collect, canvas, ctx, x, y
const rect = 10

document.onpointerdown = (event) => {
  window.open(canvas.toDataURL("image/png"), '_blank')
}


init()
animate()

function init() {

  x = y = 0

  canvas = document.createElement('canvas')
  document.body.appendChild( canvas )
  ctx = canvas.getContext('2d')
  ctx.canvas.width  = window.innerWidth
  ctx.canvas.height = window.innerHeight

  console.log( canvas )
  val = getRnd()
  collect = 1

}



function animate () {
  requestAnimationFrame( animate )
  
  if ( val === getRnd() ) {
    collect ++
  } else {
    val = getRnd()
    collect = 0
  }

  const r = 255 / ( collect + 1 )
  const g = 0
  let a = r / 255
  let b = r

  ctx.fillStyle = "rgba("+255+","+255+","+255+","+255+")"
  ctx.fillRect( x, y, rect, rect )
  ctx.fillStyle = "rgba("+r+","+g+","+b+","+a+")"
  ctx.fillRect( x, y, rect, rect )

  x += rect
  if ( x >= canvas.width ) {
    y += rect
    x = 0
  }

  if ( y >= canvas.height ) {
    y = 0
  }

  //console.log( collect )

}
  


function onWindowResize() {
  animate()
}

function getRnd() {
  return Date.now() % 2
}