let val, val2, collect, collect2, canvas, ctx, x, y
const rect = 10
const half = window.innerWidth / 2

document.onpointerdown = (event) => {
  window.open(canvas.toDataURL("image/png"), '_blank')
}


init()
animate()

function init() {

  canvas = document.createElement('canvas')
  document.body.appendChild( canvas )
  ctx = canvas.getContext('2d')
  ctx.canvas.width  = window.innerWidth
  ctx.canvas.height = window.innerHeight

  //set vars
  val = getRnd()
  val2 = getRndInt()
  collect = collect2 = 1
  x = y = 0

}

function animate () {
  requestAnimationFrame( animate )
  
  //My.random()
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

  //Math.random()
  if ( val2 === getRndInt() ) {
    collect2 ++
  } else {
    val2 = getRndInt()
    collect2 = 0
  }

  const r2 = 255 / ( collect2 + 1 )
  const g2 = 0
  let a2 = r2 / 255
  let b2 = r2

  ctx.fillStyle = "rgba("+255+","+255+","+255+","+255+")"
  ctx.fillRect( x + half, y, rect, rect )
  ctx.fillStyle = "rgba("+r2+","+g2+","+b2+","+a2+")"
  ctx.fillRect( x + half, y, rect, rect )

  //move cursor
  x += rect
  if ( x >= canvas.width / 2 ) {
    y += rect
    x = 0
  }

  if ( y >= canvas.height ) {
    y = 0
  }

}

function getRnd() {
  return Date.now() % 2
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

function getRndInt() {
  return getRandomInt(0, 10) % 2
}
