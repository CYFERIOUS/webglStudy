import * as THREE from 'three';

let _meshBasicMaterial;
let _meshPhongMaterial;
let _meshBiMaterial;
let _mDepthMaterial;
let _mPointMaterial;
let _mLambertMaterial;
let _mPhongMaterial;
let _mStandardMaterial;
export class Materials{ 

    constructor(option) {
        switch(option){
            case 1:
               return this.basicMaterial();
            break;
            case 2:
                return this.phongMaterial();
            break;
            case 3:
                return this.bisideMaterial();
            break;
            case 4:
                return this.mDepthMaterial();
            break;
            case 5:
                return this.mPointMaterial();
            break;
            case 6:
                return this.mLambertMaterial();
            break;
            case 7:
                return this.mPhongMaterial();
            break;
            case 8:
                return this.mStandardMaterial();
            break;

        }
      }

      basicMaterial(){
        _meshBasicMaterial = new THREE.MeshBasicMaterial({
                    color: 0x35373a,
                    wireframe:false,
                    opacity: 1,
                   
                });
        return _meshBasicMaterial;
         
      }

      phongMaterial(){
        _meshPhongMaterial = new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    wireframe:false,
                    opacity: 0.3,
                    transparent: true
                    });
        return _meshPhongMaterial;
        
      }

      bisideMaterial(){
        _meshBiMaterial = new THREE.MeshBasicMaterial({
                    color: 0x03b7fa,
                    opacity: 0.6,
                    transparent: true,
                    side:THREE.DoubleSide
                    });
        return _meshBiMaterial;
      }

      mDepthMaterial(){
        _mDepthMaterial = new THREE.MeshDepthMaterial({
                    opacity: 0.3,
                    transparent: true,});
        return _mDepthMaterial;
      }

      mPointMaterial(){
        _mPointMaterial = new THREE.PointsMaterial({
                     color: 0x000000,
                    });
        return _mPointMaterial;
      }

      mLambertMaterial(){
        _mLambertMaterial = new THREE.MeshLambertMaterial({
                    side:THREE.DoubleSide,
                     color: 0x03b7fa,
                     emisive:0xE38949,
                     emisiveIntensity:1
                    });
        return _mLambertMaterial;
      }

      mPhongMaterial(){
        _mPhongMaterial = new THREE.MeshPhongMaterial({
                    side:THREE.DoubleSide,
                     color: 0x03b7fa,
                     emisive:0xE38949,
                     emisiveIntensity:1,
                     shininess:100
                    });
        return _mPhongMaterial;
      }
      mStandardMaterial(){
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


}

