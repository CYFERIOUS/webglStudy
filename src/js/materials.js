import * as THREE from 'three';

let _meshMaterial;

export class Materials{ 
    constructor() {
        _meshMaterial = new THREE.MeshPhongMaterial( {
          color: 0xffffff,
          opacity: 0.3,
          transparent: true
        });
        return _meshMaterial;
      }
}

