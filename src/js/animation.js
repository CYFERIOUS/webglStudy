import * as THREE from 'three';
import {Materials} from './materials.js';




export class Anima{

  

    constructor(corpus) {
        const animationMixer =  new THREE.AnimationMixer(corpus.scene);
        this.clipAction(animationMixer,corpus);
      }

      clipAction(animationMixer, corpus){
        const clipAction = animationMixer.clipAction(corpus.animations[0]);
        this.play(clipAction)
      }

      play(clipAction) {
        clipAction.play();
      }

     
}