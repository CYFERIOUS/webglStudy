import * as THREE from 'three';
import {Materials} from './materials.js';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';
import { Cube } from './cube.js';
import { Particles } from './particles.js';

let _size = new Array(200,400,600,800,1000,1200,1400,1600,1800,2000,2200,2400,2600,2800,3000);
let _geometry;
let _material;
let _sphereGeometry;
let _sphereMaterial;
let _sampler;
let _spheres;
let _cubo;
const group = new THREE.Group();
let _pile = new Array();



export class Startrek {

    constructor(sizeX, sizeY, sizeZ ) {
        _geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ );
        _material = new THREE.MeshBasicMaterial({
            transparent: true
        });
        _cubo = new THREE.Mesh(_geometry,_material);
        _cubo.position.x = 0;
        _cubo.position.y = 0;
        _cubo.position.z = 0;
        
        const cubeParticles = new Particles(_cubo);
        _pile.push(cubeParticles); 
          
    }

    createMatrix(){
      for(let i of _size){
         this.constructor(i,i,i);
       }
    }


    draw(){
      this.createMatrix();
        return _pile
      
    }





} 
