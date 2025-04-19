import * as THREE from 'three';
import {Materials} from './materials.js';
import { Shaders } from './shaders.js';

let _plane;
let _plano;
let _size = new Array(10,20,30,40,50,60);
let _pile = new Array();

const shader_material = new Shaders();
const basic_material = new Materials(1);


export class Plane{ 
    constructor(sizeX,sizeY,DivX,DivY) {
      
        _plane = new THREE.PlaneGeometry(sizeX, sizeY, DivX,DivY);
        
        console.log("shader!",shader_material.getShader())

        _plano = new THREE.Mesh( _plane, shader_material.getShader()  );
        
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

