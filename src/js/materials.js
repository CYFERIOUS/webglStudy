import * as THREE from 'three';

let _meshBasicMaterial;
let _meshPhongMaterial;

export class Materials{ 

    constructor(option) {
        switch(option){
            case 1:
               return this.basicMaterial();
            break;
            case 2:
                return this.phongMaterial();
            break;

        }
      }

      basicMaterial(){
        _meshBasicMaterial = new THREE.MeshBasicMaterial({
                    color: 0x03b7fa,
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


}

