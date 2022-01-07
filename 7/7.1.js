const divs = 50;
const length = 100;
const unit = length / divs;

const crvs = 15;
const spread = 5;
const offset = 80;


const lineA = genPoly();
const lineB = genPoly( true );
//this.add( lineA ); 
//this.add( lineB ); 
const lines = cxn( lineA, lineB );

for ( let j = 0; j < crvs; j ++ ) { 
	
	const pts = [];
	
	
	
	

for ( let i = 0; i < lines.length; i ++ ) { 
	//this.add(lines[i]); 
	const positions = lines[i].geometry.attributes.position.array; 
	const u = positions[ j * 3 ];
	const v = positions[ (j * 3) + 1 ];
	const pt = new THREE.Vector3(u,v,0); 
	pts.push(pt);
	
	

}
	
	const g = new THREE.BufferGeometry().setFromPoints( pts );
