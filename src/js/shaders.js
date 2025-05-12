import * as THREE from 'three';
import vshader from './glsl/vertex.glsl';
import fshader from './glsl/fragment.glsl';

let material;
let mousex;
let mousey;

export class Shaders{

    constructor() {

    
        material = new THREE.RawShaderMaterial({
            vertexShader: vshader,
            fragmentShader:fshader,
            side: THREE.DoubleSide,
            uniforms: {
              u_amplitude: {value: 12.0},
              u_time:{value:0},
              u_color:{value: new THREE.Color("purple")},
              u_time_color:{value:0},
              u_cursor_color: {value: new THREE.Vector2(mousex+100.0,mousey)}
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
