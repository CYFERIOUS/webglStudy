import * as THREE from 'three';

import imgb from '../images/cosmic.jpg';
import imgb2 from '../images/bump.jpg';
import imgb3 from '../images/displacementmap.png';
import imgb4 from '../images/normalMap.jpeg';
import imgb5 from '../images/textureColor.jpeg';
import a from '../images/a.png';
import b from '../images/b.png';
import c from '../images/c.png';
import d from '../images/d.png';
import e from '../images/e.png';
import f from '../images/f.png';


let _texture;
let _cubeBackGround;
let _envTexture;
export class Texture{
    constructor() {
        _texture = new THREE.TextureLoader();
      }

      drawBackGround(){
        return _texture.load(imgb);
      }
      drawCubeBackGround(){
        _cubeBackGround = new THREE.CubeTextureLoader();
        _envTexture = _cubeBackGround.load([
            a,
            c,
            e,
            f,
            d,
            b
        ]);
        return _envTexture;
      }

      draw(option) {
        switch (option) {
            case 1:
                const loadedT1 = _texture.load(imgb2);
                return loadedT1;
            break;
            case 2:
                const loadedT2 = _texture.load(imgb3);
                return loadedT2;
            break;
            case 3:
                const loadedT3 = _texture.load(imgb4);
                return loadedT3;
            break;
            case 4:
                const loadedT4 = _texture.load(imgb5);
                return loadedT4;
            break;
        
            default:
                break;
        }
        
      }
}