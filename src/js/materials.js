import * as THREE from 'three';
import { Texture } from './texture.js';

let _meshBasicMaterial;
let _mDepthMaterial;
let _mNormalMaterial;
let _mMatCapMaterial;
let _mLambertMaterial;
let _mPhongMaterial;
let _mToonMaterial;
let _mStandardMaterial;
let _mPointMaterial;



export class Materials{ 

    constructor(option) {
        switch(option){
            case 1:
               return this.basicMaterial();
            break;
            case 2:
              return this.depthMaterial();
           break;
           case 3:
                return this.normalMaterial();
            break;
            case 4:
                return this.matCaplMaterial();
            break;
            case 5:
                return this.lambertMaterial();
            break;
            case 6:
              return this.phongMaterial();
          break;
            case 7:
                return this.toonMaterial();
            break;
            case 8:
                return this.standardMaterial();
            break;
            case 9:
                return this.pointMaterial();
            break;
            
            
            case 8:
                return this.standardMaterial();
            break;

        }
      }

      basicMaterial(){
        const mapBasic = new Texture();
        _meshBasicMaterial = new THREE.MeshBasicMaterial({
                    map:mapBasic.draw(1),
                    opacity:0.2,
                    side:THREE.DoubleSide
                });
        return _meshBasicMaterial;
         
      }
      depthMaterial(){
        _mDepthMaterial = new THREE.MeshDepthMaterial({
                    opacity: 0.3,
                    transparent: true,});
        return _mDepthMaterial;
      }
      normalMaterial(){
        _mNormalMaterial = new THREE.MeshNormalMaterial({
                    opacity: 0.3,
                    transparent: true,});
        return _mNormalMaterial;
      }

      matCaplMaterial(){
        _mMatCapMaterial = new THREE.MeshMatcapMaterial({
                    opacity: 0.3,
                    transparent: true,});
        return  _mMatCapMaterial;
      }
      lambertMaterial(){
        _mLambertMaterial = new THREE.MeshLambertMaterial({
                    side:THREE.DoubleSide,
                     color: 0x03b7fa,
                     emisive:0xE38949,
                     emisiveIntensity:1
                    });
        return _mLambertMaterial;
      }

      phongMaterial(){
        _mPhongMaterial = new THREE.MeshPhongMaterial({
                    side:THREE.DoubleSide,
                     color: 0x03b7fa,
                     emisive:0xE38949,
                     emisiveIntensity:1,
                     shininess:100
                    });
        return _mPhongMaterial;
      }

      toonMaterial(){
        _mToonMaterial = new THREE.MeshToonMaterial({
                    side:THREE.DoubleSide,
                     color: 0x03b7fa,
                     emisive:0xE38949,
                     emisiveIntensity:1,
                     shininess:100
                    });
        return _mToonMaterial;
      }

      standardMaterial(){
        _mStandardMaterial = new THREE.MeshPhongMaterial({
                    side:THREE.DoubleSide,
                     color: 0x03b7fa,
                      opacity: 0.5,
                    transparent: true,
                     emisive:0xE38949,
                     emisiveIntensity:0.3,
                     metalness:1
                    });
        return _mStandardMaterial;
      }
      pointMaterial(){
        _mPointMaterial = new THREE.PointsMaterial({
                     color: 0x000000,
                    });
        return _mPointMaterial;
      }

     

     
      


}

