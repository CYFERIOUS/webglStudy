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
      
        }
      }

      basicMaterial(){
        const mapBasic = new Texture();
          _meshBasicMaterial  = new THREE.MeshBasicMaterial();
          _meshBasicMaterial.map = mapBasic.draw("cube");
          _meshBasicMaterial.transparent = true;
          _meshBasicMaterial.opacity = 0.4;
          _meshBasicMaterial.side = THREE.DoubleSide;
        return _meshBasicMaterial;
         
      }
      depthMaterial(){
          const mapDepth = new Texture();
          _mDepthMaterial = new THREE.MeshStandardMaterial();
          _mDepthMaterial.side=THREE.FrontSide;
          _mDepthMaterial.map = mapDepth.draw("messier");
          _mDepthMaterial.displacementMap = mapDepth.draw("sphere");
          _mDepthMaterial.opacity =1;
         
        return _mDepthMaterial;
      }
      normalMaterial(){
       
          _mNormalMaterial = new THREE.MeshNormalMaterial();
          _mNormalMaterial.opacity = 0.3;
          _mNormalMaterial.transparent = true;
        return _mNormalMaterial;
      }

      matCaplMaterial(){
          _mMatCapMaterial = new THREE.MeshMatcapMaterial();
          _mMatCapMaterial.opacity = 0.3;
          _mMatCapMaterial.transparent = true;
        return  _mMatCapMaterial;
      }
      lambertMaterial(){
          _mLambertMaterial = new THREE.MeshLambertMaterial();
          _mLambertMaterial.side=THREE.DoubleSide;
          _mLambertMaterial.color=0x03b7fa;
          _mLambertMaterial.emisive=0xE38949;
          _mLambertMaterial.emisiveIntensity=1;
        return _mLambertMaterial;
      }

      phongMaterial(){
        _mPhongMaterial = new THREE.MeshPhongMaterial();
        _mPhongMaterial.side=THREE.DoubleSide;
        _mPhongMaterial.color= 0x03b7fa;
        _mPhongMaterial.emisive=0xE38949;
        _mPhongMaterial.emisiveIntensity=1;
        _mPhongMaterial.shininess=100;
        return _mPhongMaterial;
      }

      toonMaterial(){
          _mToonMaterial = new THREE.MeshToonMaterial();
          _mToonMaterial.side=THREE.DoubleSide;
          _mToonMaterial.color= 0x03b7fa;
          _mToonMaterial.emisive=0xE38949;
          _mToonMaterial.emisiveIntensity=1;
          _mToonMaterial.shininess=100;
        return _mToonMaterial;
      }

      standardMaterial(){
        _mStandardMaterial = new THREE.MeshStandardMaterial();
          _mStandardMaterial.side=THREE.DoubleSide;
          _mStandardMaterial.color= 0x03b7fa;
          _mStandardMaterial.opacity= 0.5;
          _mStandardMaterial.transparent= true;
          _mStandardMaterial.emisive=0xE38949;
          _mStandardMaterial.emisiveIntensity=0.3;
          _mStandardMaterial.metalness=1;
        return _mStandardMaterial;
      }
      pointMaterial(){
        _mPointMaterial = new THREE.PointsMaterial();
        _mPointMaterial.color= 0x000000;
        return _mPointMaterial;
      }

     

     
      


}

