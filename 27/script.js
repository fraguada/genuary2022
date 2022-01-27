let val, val2, collect, collect2, canvas, ctx, x, y
const rect = 10

const colors = ['#2E294E', '#541388', '#F1E9DA', '#FFD400', '#D90368']
colors.reverse()

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

  ctx.fillStyle = "rgba("+255+","+255+","+255+","+255+")"
  ctx.fillRect( x, y, rect, rect )
  let color = colors[collect]
  if (color === undefined) {
    color = colors [getRandomInt(0, colors.length - 1)]
  }
  ctx.fillStyle = color//"rgba("+r+","+g+","+b+","+a+")"
  ctx.fillRect( x, y, rect, rect )


/*
  if (Math.random() < 0.01 ) {

    //ctx.fillStyle = "rgba("+255+","+255+","+255+","+255+")"
    //ctx.fillRect( x, y, rect, rect )
    const xx = getRandomInt(0 , canvas.width)
    const yy = getRandomInt(0 , canvas.height)
    const ss = getRandomInt(1 , 4)
    ctx.fillStyle = "#87ab08"
    ctx.fillRect( xx, yy, rect*ss, rect*ss )

  }
 */

  //move cursor
  x += rect
  if ( x >= canvas.width ) {
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
