const rd = this.getObjectByName('rd');
const bunny = this.getObjectByName('bunny');
bunny.visible = false;

bunny.geometry.computeBoundingBox();
bunny.geometry.computeBoundingSphere();
bunny.geometry.computeVertexNormals();
const helper = new THREE.Box3Helper( bunny.geometry.boundingBox, 0xffff00 );
//this.add( helper );

const points = [];

let index = 0;

const dimX = 10/2; 
const dimY = 20/2; 
const dimZ = 10/2; 

const mat = new THREE.MeshStandardMaterial( { flatShading: true, roughness: 0.5 } );

const mesh = new THREE.InstancedMesh(rd.geometry.clone(), mat, 4000);
mesh.castShadow = true;
mesh.receiveShadow = true;
this.add(mesh);

for(let i = 0; i < 10; i++) {
	
	for(let j = 0; j < 20; j++) { 
		
		for(let p = 0; p <20; p++) { 
			
			
		
			let x = i - dimX;
			let xOffset = 0;
			let y = p - dimY;
			let z = j;


			if( (j % 2) === 1 || (p % 2) === 1   ) {
				//odd
				xOffset = 1;

			}

			x = ( x*2 ) + xOffset;

			const pt = new THREE.Vector3( x, y, z);
			
			const raycaster = new THREE.Raycaster();
			raycaster.set(pt, new THREE.Vector3( 0,1,0 ));
			const intersects = raycaster.intersectObject( bunny );

			
			if( ( intersects.length % 2 ) === 1  ) {
				
				const temp = new THREE.Object3D();
				temp.position.set(x,y,z);
				temp.updateMatrix(); 
				mesh.setMatrixAt( index, temp.matrix );

				points.push(pt);
			}
			
		

			
			index++;
		}
		
	}

}


const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.PointsMaterial( { color: 0xff00ff, size: 0.1 } );
const pc = new THREE.Points(geometry, material);

this.add(pc);
rd.visible = false;

function update( event ) {
this.rotation.z += 0.001;
}