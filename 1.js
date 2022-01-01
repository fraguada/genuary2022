let obj = new THREE.DodecahedronGeometry(1, 0);
//let mat = new THREE.MeshNormalMaterial({wireframe:true});
let mat = new THREE.MeshStandardMaterial();
let mesh = new THREE.Mesh(obj,mat);

let g = new THREE.Group();
for ( var i = 0; i < 10000; i ++ ) {

	var d = mesh.clone();
	
let x = Math.random() * 10;
let y = Math.random() * 10;
let z = Math.random() * 10;

d.position.set(x,y,z);
	g.add(d);
	


}
this.add(g);


function update( event ) {
//g.rotation.x += 0.01;
	//g.rotation.y += 0.01;
	//g.rotation.z += 0.01;


}
