import * as THREE from 'three';
import {Materials} from './materials.js';
let _geoTorus;
let _donut;
let _size = new Array(200,400,600,800,1000,1200,1400,1600,1800);
let _pile = new Array();


const basic_material = new Materials(2);

export class Torus{ 
    constructor(R,D,Rsn,Tub) {

    
        _geoTorus = new THREE.TorusGeometry( R, D, Rsn, Tub);
        
        _donut = new THREE.Mesh( _geoTorus, basic_material );
        _donut.position.x = 0;
        _donut.position.y = 0;
        _donut.position.z = 0;

        _pile.push (_donut);
     
      }

      createMatrix(){
          var random = Math.round(Math.random() * (Math.PI*2 - 5) + 5);
         for(let i of _size){
            this.constructor(i,22,30,random); 
          }
      }
    
      draw() {
        this.createMatrix();
        return _pile;
      }
}
  