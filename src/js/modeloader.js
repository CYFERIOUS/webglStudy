import * as THREE from 'three';
import { FBXLoader } from '../../node_modules/three/examples/jsm/loaders/FBXLoader.js';
import { DRACOLoader } from '../../node_modules/three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import {Materials} from './materials.js';

import spaceShip from '../models/nave.fbx';
import argonaut from '../models/astronauta2.glb';

let model =  new THREE.Object3D();
const ship_material = new Materials(6);
const fbxLoader = new FBXLoader();
const glbLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/draco/' );
console.log("draco",dracoLoader);
dracoLoader.setDecoderConfig({ type: 'js' });
glbLoader.setDRACOLoader(dracoLoader);
const clock = new THREE.Clock(); 

export class Modeloader{
    
  
    
    constructor(option) {
      
        switch (option) {
          case "fbx":
            return this.fbx_Loader();
          break;
          case "glb":
            return this.glb_loader();
          break;
          default:
              break;
        }
    }

    fbx_Loader(){
      fbxLoader.load(
      	// resource URL
      	spaceShip,
      	// called when resource is loaded
       ( object )=> {
              object.traverse(function(child) {
                  if (child instanceof THREE.Mesh) {
                    child.material = ship_material;
                  }
              });
          //console.log(object);
          object.scale.x = 0.8;
          object.scale.y = 0.8;
          object.scale.z = 0.8;
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
    animationMixer = null;
    glb_loader(){
      
      glbLoader.load(
      	// resource URL
      	argonaut,
      	// called when resource is loaded
       ( object )=> {
       
        this.animationMixer = new THREE.AnimationMixer(object.scene);
        const clipAction = this.animationMixer.clipAction(object.animations[0]);
        clipAction.play();
        object.scene.scale.x = 10;
        object.scene.scale.y = 10; 
        object.scene.scale.z = 10; 
        object.scene.material = THREE.MeshBasicMaterial;
          model = object.scene;
          console.log("popo",object)
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

  previousTime = 0;
  animate(time){
      let myInterval;
      const elapsedTime = clock.getElapsedTime();
      const frameTime = elapsedTime - this.previousTime;
      this.previousTime = elapsedTime;
      if(this.animationMixer){
        this.animationMixer.update(frameTime);
      }
      requestAnimationFrame(() =>{
            this.animate();
      });
  }

  draw(){
    return model;
  }

}
