let obj = new THREE.DodecahedronGeometry(1, 0);
let mat = new THREE.MeshNormalMaterial({wireframe:true});
let mesh = new THREE.Mesh(obj,mat);
this.add(mesh);
function update( event ) {}
