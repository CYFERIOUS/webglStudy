import * as THREE from 'three';

//const _aristas = new WeakMap();
let _geometry;
let _meshMaterial;
let _geometro;
let _size = new Array(200,400,600,800,1000,1200,1400,1600,1800,2000);
let _pile = new Array();


export class Cube{ 
    constructor(sizeX,sizeY,sizeZ) {
      
        _geometry = new THREE.BoxGeometry( sizeX, sizeY, sizeZ );
        _meshMaterial = new THREE.MeshLambertMaterial( {
          color: 0xffffff,
          opacity: 0.1,
          transparent: true
        });

        _geometro = new THREE.Mesh( _geometry, _meshMaterial );
        _geometro.position.x = 0;
        _geometro.position.y = 0;
        _geometro.position.z = 0;

        _pile.push (_geometro);
     
      }

      createMatrix(){
         for(let i of _size){
            this.constructor(i,i,i); 
          }
      }
    
      draw() {
        this.createMatrix();
        return _pile;
      }
}

