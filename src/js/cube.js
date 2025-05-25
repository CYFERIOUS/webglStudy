import * as THREE from 'three';
import {Materials} from './materials.js';
import { Shaders } from './shaders.js';

let _geometry;
let _geometro;
let _size = new Array(200,400,600,800,1000,1200,1400,1600,1800,2000,2200);
let _pile = new Array();


const basic_material = new Materials(1);
const shader_material = new Shaders();

export class Cube{
    constructor(sizeX,sizeY,sizeZ) {
        _geometry = new THREE.BoxGeometry( sizeX, sizeY, sizeZ );
        this._shaderEst = shader_material.getShader();
    
        _geometro = new THREE.Mesh( _geometry, this._shaderEst );
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
        console.log("pile",_pile)
        return _pile;
      }
}
