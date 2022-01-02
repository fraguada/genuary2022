const obj = new THREE.DodecahedronGeometry(2, 0);
//let mat = new THREE.MeshNormalMaterial({wireframe:true});
const mat = new THREE.MeshStandardMaterial({flatShading:true, opacity:1});
const mesh = new THREE.InstancedMesh(obj,mat, 10000);
mesh.castShadow = true;
mesh.receiveShadow = true;
this.add(mesh);
//let temp = new THREE.Object3D();
for ( let i = 0; i < 10000; i ++ ) {

  const temp = new THREE.Object3D();

  const x = getRandomArbitrary(-10,10);
  const y = getRandomArbitrary(-10,10);
  const z = getRandomArbitrary(-10,10);
  temp.position.set(x,y,z);
  //temp.rotation.set(x,0,0);

  temp.updateMatrix(); 
  mesh.setMatrixAt( i, temp.matrix );

}


function update( event ) {
//mesh.rotation.y += 0.001;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
