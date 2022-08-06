import * as THREE from 'three';

let _meshBasicMaterial;
let _meshPhongMaterial;
let _meshBiMaterial;
let _mDepthMaterial;
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


        }
      }

      basicMaterial(){
        _meshBasicMaterial = new THREE.MeshBasicMaterial({
                    color: 0x35373a,
                    wireframe:true,
                    opacity: 0.3,
                    transparent: true
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
                    opacity: 0.3,
                    transparent: true,
                    side:THREE.DoubleSide
                    });
        return _meshBiMaterial;
      }

      mDepthMaterial(){
        _mDepthMaterial = new THREE.MeshDepthMaterial({color: 0xffffff,
                    opacity: 0.3,
                    transparent: true,});
        return _mDepthMaterial;
      }


}

