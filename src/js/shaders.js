import * as THREE from 'three';
import vshader from './glsl/vertex.glsl';
import fshader from './glsl/fragment.glsl';

let material;

export class Shaders{

    constructor() {
        material = new THREE.RawShaderMaterial({
            vertexShader: vshader,
            fragmentShader:fshader,
            side: THREE.DoubleSide
        })
      }

      getShader(){
        return material;
      }
}
