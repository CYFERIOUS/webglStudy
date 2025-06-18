import * as THREE from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';



export class PostProcessing{
    constructor(renderer) {

        const ec = new EffectComposer(renderer);
        ec.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        ec.setSize(aspect.width, aspect.height);

      }

    
      renderPass(scene, camera) {
        // Create a render pass for the scene and camera
        // This will clear the color and depth buffers before rendering the scene
       const renderPass = new RenderPass(scene, camera);
        renderPass.clear = true;
        renderPass.clearDepth = true;
        return renderPass;
      }
}
