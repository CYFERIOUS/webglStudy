import * as THREE from 'three';

import imgb from '../images/cosmic.jpg';

import mapBasic from '../images/escher.jpg';
import displacementMap from '../images/displacementmap.png';
import crater from '../images/crater.jpg';
import orion from '../images/orion.jpg';
import eyegod from '../images/eyegod.jpg';
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
      drawVideoBackground(video) {
        const videoTexture = new THREE.VideoTexture(video);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBFormat;
        return videoTexture;
      }

      draw(option) {
        switch (option) {
            case "cube":
              return _texture.load(mapBasic);
            
            break;
            case "crater":
              return _texture.load(crater);
            break;
            case "craterMap":
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