import * as THREE from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {GlitchPass} from 'three/examples/jsm/postprocessing/GlitchPass.js';

let ec;
let renderPass;
let bloomPass;
let gP;
export class PostProcessing{
    constructor(renderer) {
        ec = new EffectComposer(renderer);
      
      }

      renderPass(scene, camera) {
       renderPass = new RenderPass(scene, camera);
       bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
       //renderPass.clear = true;
       //renderPass.clearDepth = true;
       gP = new GlitchPass();
        ec.addPass(renderPass);
        ec.addPass(bloomPass);
        ec.addPass(gP);
      }

      draw() {
        // Render the scene using the effect composer
        return ec.render();
      }
}
