//scene
const cnt = 1000
const obj = new THREE.DodecahedronGeometry(0.1, 0);
const mat = new THREE.MeshStandardMaterial({flatShading:true, opacity:1});
const mesh = new THREE.InstancedMesh(obj,mat, cnt);
mesh.castShadow = true;
mesh.receiveShadow = true;
scene.add(mesh);

for ( let i = 0; i < cnt; i ++ ) {

  const temp = new THREE.Object3D();

  const x = getRandomArbitrary(-100,100);
  const y = getRandomArbitrary(-100,100);
  const z = getRandomArbitrary(-100,100);
  temp.position.set(x,y,z);
  //temp.rotation.set(x,0,0);

  temp.updateMatrix(); 
  mesh.setMatrixAt( i, temp.matrix );

}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


function update( event ) {
mesh.rotation.x += 0.0001;
}

//dodecahedron
const cnt = 10000
const obj = new THREE.TetrahedronGeometry(0.1, 3);
										
const mat = new THREE.MeshStandardMaterial({flatShading:true, roughness:0.5, metalness: 0.5});
const mesh = new THREE.InstancedMesh(obj,mat, cnt);
mesh.castShadow = true;
mesh.receiveShadow = true;
this.add(mesh);

for ( let i = 0; i < cnt; i ++ ) {

  const temp = new THREE.Object3D(); 
	const d = getRandomArbitrary(1.5, 1.95); const rY = getRandomArbitrary(0, 2);
	
	

const pt = randomSpherePoint(0,0,0,d)
  temp.position.set(pt[0], pt[1], pt[2]); 

  temp.rotation.set(rY * Math.PI,0,0);

  temp.updateMatrix(); 
  mesh.setMatrixAt( i, temp.matrix );

}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

//src: https://stackoverflow.com/a/15048260/2179399
function randomSpherePoint(x0,y0,z0,radius){
