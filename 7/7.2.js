		  const geometry = new THREE.BufferGeometry().setFromPoints( pts );
		
		  
		  const line = new THREE.Line( geometry, material );
		  line.userData.ids = [i,points.length+1];
		  this.add(line);
		  
	  }
	  
	  if (points.length > maxPts) {
	  this.traverse(child => {
        if (child.userData.ids.includes(0)) {
            this.remove(child)
        }
    })
	  }
	  
	  
  
  
  }
	
	
	
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
