import * as THREE from 'three';
import {Materials} from './materials.js';

let _geoRandom;
let _randomMesh;
let _size = new Array(100,200,300,400,500,600,700,800,900,1000);
let _pile = new Array();


const basic_material = new Materials(4);

export class RandomGeo{ 
    constructor(A,B,C,D) {

let _geoRandom = new THREE.BufferGeometry()
const points = [
    new THREE.Vector3(-C,C,-C),//c
    new THREE.Vector3(-B,-B,B),//b
    new THREE.Vector3(A,A,A),//a   

    new THREE.Vector3(A,A,A),//a    
    new THREE.Vector3(D,-D,-D),//d  
    new THREE.Vector3(-C,C,-C),//c

    new THREE.Vector3(-B,-B,B),//b
    new THREE.Vector3(D,-D,-D),//d  
    new THREE.Vector3(A,A,A),//a

    new THREE.Vector3(-C,C,-C),//c
    new THREE.Vector3(D,-D,-D),//d    
    new THREE.Vector3(-B,-B,B),//b
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
            this.constructor(i,i,i,i); 
          }
      }
    
      draw() {
        this.createMatrix();
        return _pile;
        
      }
}
  