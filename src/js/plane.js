import * as THREE from 'three';
import {Materials} from './materials.js';

let _plane;
let _plano;
let _size = new Array(1000);
let _pile = new Array();

const phong_material = new Materials(1);


export class Plane{ 
    constructor(sizeX,sizeY,DivX,DivY) {
      
        _plane = new THREE.PlaneGeometry(sizeX, sizeY, DivX,DivY);
        

        _plano = new THREE.Mesh( _plane, phong_material  );
        _plano.rotation.x = -Math.PI/3;
        _plano.position.x = 0;
        _plano.position.y = 0;
        _plano.position.z = 0;

        _pile.push (_plano);
     
      }

      createMatrix(){
         for(let i of _size){
            this.constructor(i,i,10,10); 
          }
      }
    
      draw() {
        this.createMatrix();
        return _pile;
      }
}

