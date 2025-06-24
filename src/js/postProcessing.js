import * as THREE from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {GlitchPass} from 'three/examples/jsm/postprocessing/GlitchPass.js';
import {DotScreenPass} from 'three/examples/jsm/postprocessing/DotScreenPass.js';
import {FilmPass} from 'three/examples/jsm/postprocessing/FilmPass.js';
import {AfterimagePass} from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';
import { KaleidoShader } from 'three/examples/jsm/shaders/KaleidoShader.js';
import vshader from './glsl/mVSPP.glsl';
import fshader from './glsl/mFSPP.glsl';


let ec;
let renderPass;
let bloomPass;
let gP;
let dotPass;
let fP;
let aiP;
let sp;
let myPass;
export class PostProcessing{
    constructor(renderer) {
        ec = new EffectComposer(renderer);
      
      }

      renderPass(scene, camera) {
       renderPass = new RenderPass(scene, camera);
       bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
       dotPass = new DotScreenPass();
       gP = new GlitchPass();
       fP = new FilmPass();
       aiP = new AfterimagePass();
        ec.addPass(renderPass);
        //ec.addPass(bloomPass);
        //ec.addPass(gP);
        //ec.addPass(aiP);
        //sp = new ShaderPass(LuminosityShader);
        //sp = new ShaderPass(KaleidoShader);
        //ec.addPass(sp);
        const customShader = this.ownPass();
        myPass = new ShaderPass(customShader);
        ec.addPass(myPass);
      }

      ownPass() {
        const myShader = {
          uniforms: {
            tDiffuse: { value: null }
          },
          vertexShader:vshader,
          fragmentShader:fshader
        }
       return myShader;
      }

      draw() {
        // Render the scene using the effect composer
        return ec.render();
      }
}
