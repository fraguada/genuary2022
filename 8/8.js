// y=A*sin(Bx+C)+D

const amplitude = 2;
const period = ( 2 * Math.PI ) / 2;
const phase = 0;
const vertical = 0;

const tX = 0.6;
const tY = 1;
const num = 50;

let x = 0;
let y = 0;
let z = 0;



const material = new THREE.LineBasicMaterial( {
	color: 0xffffff
} );

let points = [];

function update( event ) { 
	
	
		this.children = [];
	
	
	x += 0.1;
	y = ( amplitude * Math.sin( ( period * x ) + phase ) ) + vertical; 
	const pt = new THREE.Vector3( x, y, z ); 
	points.push( pt ); 
	const geometry = new THREE.BufferGeometry().setFromPoints( points );
	const line = new THREE.Line( geometry, material );
	
	this.add( line ); 
	for ( let i = 0; i < num; i ++ ) { 
		const c = line.clone(); 
		c.translateY( -tY * i ); 
		c.translateX( -tX * i );
		this.add( c );
		
		
		
	
	}
	
	

}
