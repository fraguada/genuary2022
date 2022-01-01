let obj = new THREE.DodecahedronGeometry(1, 0);
//let mat = new THREE.MeshNormalMaterial({wireframe:true});
let mat = new THREE.MeshStandardMaterial();
let mesh = new THREE.Mesh(obj,mat);

for ( var i = 0; i < 10000; i ++ ) {

	var d = mesh.clone();
	
let x = Math.random() * 10;
let y = Math.random() * 10;
let z = Math.random() * 10;

d.position.set(x,y,z);
	this.add( d );


}


function update( event ) {}
