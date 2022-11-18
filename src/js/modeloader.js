import * as THREE from 'three';
import { FBXLoader } from '../../node_modules/three/examples/jsm/loaders/FBXLoader.js';
import {Materials} from './materials.js';
import objTest from '../models/nave.fbx';

let model =  new THREE.Object3D();
const ship_material = new Materials(4);
const loader = new FBXLoader();

export class Modeloader{

    constructor() {
      loader.load(
      	// resource URL
      	objTest,
      	// called when resource is loaded
       ( object )=> {
              object.traverse(function(child) {
                  if (child instanceof THREE.Mesh) {
                    child.material = ship_material;
                  }
              });
          //console.log(object);
          object.scale.x = 0.1;
          object.scale.y = 0.1;
          object.scale.z = 0.1;
          model = object;
      	},
      	// called when loading is in progresses
      	( xhr ) => {
      		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      	},
      	// called when loading has errors
      	( error ) => {
      		console.log( 'An error happened' );
          console.log( error );
      	}
      );

    }

    draw(){

        return model;
    }

}
