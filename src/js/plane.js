import * as THREE from 'three';
import {Materials} from './materials.js';
import { Shaders } from './shaders.js';

let _plane;
let _plano;
let _size = new Array(1);
let _pile = new Array();

const shader_material = new Shaders();
const basic_material = new Materials(1);


export class Plane{ 
    constructor(sizeX,sizeY,DivX,DivY) {
      
        _plane = new THREE.PlaneBufferGeometry(sizeX, sizeY, DivX,DivY);
        
        console.log("shader!",shader_material.getShader())
         this._shaderEst = shader_material.getShader();
    
        _plano = new THREE.Mesh( _plane, this._shaderEst  );
       
        _plano.position.x = 0;
        _plano.position.y = 0;
        _plano.position.z = 0;

        const amount = _plane.attributes.position.count;
        const newAttrArray = new Float32Array(amount);

        for(let i = 0; i<amount; i++){
          newAttrArray[i] = Math.random();
        }

        _plane.setAttribute("a_modulus", new THREE.BufferAttribute(newAttrArray,1))

        _pile.push (_plano);
     
      }

      animation(eTime){
       this._shaderEst.uniforms.u_time.value = eTime;
       this._shaderEst.uniforms.u_time_color = eTime;
      }

      createMatrix(){
         for(let i = 0; i <= _size.length; i++){
            this.constructor(i*1000,i*1000,100,100); 
          }
      }
    
      draw() {
        this.createMatrix();
        return _pile;
      }
}

