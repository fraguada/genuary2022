const obj = new THREE.DodecahedronGeometry(1, 0);
//let mat = new THREE.MeshNormalMaterial({wireframe:true});
let mat = new THREE.MeshStandardMaterial({transparent:true, opacity:1});
let mesh = new THREE.InstancedMesh(obj,mat, 10000);
mesh.castShadow = true;
mesh.receiveShadow= true;
this.add(mesh);
//let temp = new THREE.Object3D();
for ( var i = 0; i < 10000; i ++ ) {
	
	

	let temp = new THREE.Object3D();
	
let x = Math.random() * 10;
let y = Math.random() * 10;
let z = Math.random() * 10;
	temp.position.set(x,y,z);
	temp.updateMatrix(); 
	mesh.setMatrixAt(i, temp.matrix);
	
	
	


	
	


}
//this.add(g);


function update( event ) {
//g.rotation.x += 0.01;
	//g.rotation.y += 0.01;
	//g.rotation.z += 0.01;


}
