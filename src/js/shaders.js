import * as THREE from 'three';
import vshader from './glsl/vertex.glsl';
import fshader from './glsl/imageFragment.glsl';
import { Texture } from './texture';

let material;
let mousex;
let mousey;

export class Shaders{

    constructor() {


      const img_shader = new Texture();
      const imgToShader = img_shader.draw("messier");
      
        material = new THREE.RawShaderMaterial({
            vertexShader: vshader,
            fragmentShader:fshader,
           
            uniforms: {
              u_texture:{value:imgToShader} 
            }
        })

       
      }

      setMouse(x,y){
        material.uniforms.u_cursor_color.x = x;
        material.uniforms.u_cursor_color.y = y;
      }
      
      getShader(){
        return material;
      }
}
