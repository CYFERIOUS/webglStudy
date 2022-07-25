import * as THREE from 'three';
import {Materials} from './materials.js';

let _geosphere;
let _geoball;
let _size = new Array(200,400,600,800,1000,1200,1400,1600);
let _pile = new Array();


const basic_material = new Materials(1);

export class Sphere{ 
    constructor(R,Hs,Vs) {
      
        _geosphere = new THREE.SphereGeometry( R, Hs, Vs );
        
        _geoball = new THREE.Mesh( _geosphere, basic_material );
        _geoball.position.x = 0;
        _geoball.position.y = 0;
        _geoball.position.z = 0;

        _pile.push (_geoball);
     
      }

      createMatrix(){
         for(let i of _size){
            this.constructor(i,30,30); 
          }
      }
    
      draw() {
        this.createMatrix();
        return _pile;
        //return _geoball;
      }
}
  