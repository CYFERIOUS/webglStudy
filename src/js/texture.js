import * as THREE from 'three';

import imgb from '../images/cosmic.jpg';
import imgb2 from '../images/bump.jpg';
import imgb3 from '../images/displacementmap.png';
import imgb4 from '../images/normalMap.jpeg';
import imgb5 from '../images/textureColor.jpeg';
import right from '../images/right.png';
import left from '../images/left.png';
import top from '../images/top.png';
import bottom from '../images/bottom.png';
import rear from '../images/rear.png';
import front from '../images/front.png';
import mapBasic from '../images/escher.jpg';

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
            right,
            left,
            top,
            bottom,
            rear,
            front
        ]);
        return _envTexture;
      }

      draw(option) {
        switch (option) {
            case 1:
                const loadedT1 = _texture.load(mapBasic);
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