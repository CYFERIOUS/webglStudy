import * as THREE from 'three';
import {Materials} from './materials.js';
import { Texture } from './texture.js'

let _geosphere;
let _geoball;
let _size = new Array(200,600,1000,1400);
let _pile = new Array();

const depth_material = new Materials(8);

export class Sphere{
    constructor(R,Hs,Vs) {

        //var random = Math.round(Math.random() * (Math.PI*2 - 0) + 0);

        _geosphere = new THREE.SphereGeometry( R, Hs, Vs, 0, 360, 0, 360);
        
        _geoball = new THREE.Mesh( _geosphere, depth_material );
        
        _geoball.position.x = 0;
        _geoball.position.y = 0;
        _geoball.position.z = 0;

        _pile.push (_geoball);

      }

      createMatrix(){
         for(let i of _size){
            this.constructor(i,100,100);
          }
      }

      draw() {
        this.createMatrix();
        return _pile;
      }
}
