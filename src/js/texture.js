import * as THREE from 'three';

import imgb from '../images/cosmic.jpg';

import mapBasic from '../images/escher.jpg';
import displacementMap from '../images/displacementmap.png';
import orion from '../images/orion.jpg';
import eyegod from '../images/eyegod.jpeg';
import messier from '../images/Messier.jpg';
import textureColor from '../images/textureColor.jpeg';
//background cube 360
import right from '../images/right.png';
import left from '../images/left.png';
import top from '../images/top.png';
import bottom from '../images/bottom.png';
import rear from '../images/rear.png';
import front from '../images/front.png';



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
            case "cube":
              return _texture.load(mapBasic);
            
            break;
            case "sphere":
              return _texture.load(displacementMap);
               
            break;
            case "orion":
              return _texture.load(orion);
                
            break;
            case "eyegod":
              return _texture.load(eyegod);
                
            break;
            case "messier":
              return _texture.load(messier);
                
            break;
        
            default:
                break;
        }
        
      }
}