import * as THREE from 'three';
import {Materials} from './materials.js';

let _geoRandom;
let _randomMesh;
let _size = new Array(100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400);
let _pile = new Array();


const basic_material = new Materials(8);

export class Octahedron{ 
    constructor(A,B,C,D,E) {

let _geoRandom = new THREE.BufferGeometry()
const points = [

    
   
    new THREE.Vector3(-A,-A,0),//
    new THREE.Vector3(-D,D,0),//
     new THREE.Vector3(0,0,E),//

    
    new THREE.Vector3(-A,-A,0),//
    new THREE.Vector3(B,-B,0),//
    new THREE.Vector3(0,0,E),//
   
    new THREE.Vector3(B,-B,0),//
    new THREE.Vector3(C,C,0),//
    new THREE.Vector3(0,0,E),//
     

    new THREE.Vector3(C,C,0),//
    new THREE.Vector3(-D,D,0),//
    new THREE.Vector3(0,0,E),//


    //////


    new THREE.Vector3(-A,-A,0),//
    new THREE.Vector3(-D,D,0),//
     new THREE.Vector3(0,0,-E),//

    
    new THREE.Vector3(-A,-A,0),//
    new THREE.Vector3(B,-B,0),//
    new THREE.Vector3(0,0,-E),//
   
    new THREE.Vector3(B,-B,0),//
    new THREE.Vector3(C,C,0),//
    new THREE.Vector3(0,0,-E),//
     

    new THREE.Vector3(C,C,0),//
    new THREE.Vector3(-D,D,0),//
    new THREE.Vector3(0,0,-E),//

  


]

_geoRandom.setFromPoints(points)
_geoRandom.computeVertexNormals()

 _randomMesh = new THREE.Mesh(_geoRandom, basic_material);

        _randomMesh.position.x = 0;
        _randomMesh.position.y = 0;
        _randomMesh.position.z = 0;
 
        
       

        _pile.push (_randomMesh);
     
      }

      createMatrix(){
          
         for(let i of _size){
            this.constructor(i,i,i,i,i); 
          }
      }
    
      draw() {
        this.createMatrix();
        return _pile;
        
      }
}
  