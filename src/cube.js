import * as THREE from 'three';

//const _aristas = new WeakMap();
let _geometry;
let _meshMaterial;
let _geometro;
let _pile = new Array();


export class Cube{ 
    constructor(sizeX,sizeY,sizeZ) {
        
        //_aristas.set(this, aristas);
        _geometry = new THREE.BoxGeometry( sizeX, sizeY, sizeZ );
        _meshMaterial = new THREE.MeshLambertMaterial( {
          color: 0xffffff,
          opacity: 0.1,
          transparent: true
        });

        _geometro = new THREE.Mesh( _geometry, _meshMaterial );
        _geometro.position.x = 0;
        _geometro.position.y = 0;
        _geometro.position.z = 0;

        _pile.push (_geometro);
     
      }

      createMatrix(){
         for(var i = 100; i<=2000; i++){
            if (i == 200){
                this.constructor(i,i,i);
            }
            if (i == 400){
                this.constructor(i,i,i);
            }
            if (i == 600){
                 this.constructor(i,i,i);
            }
            if (i == 800){
                this.constructor(i,i,i);
            }
            if (i == 1000){
                this.constructor(i,i,i);
            }
            if (i == 1100){
                this.constructor(i,i,i);
            }
            if (i == 1200){
                this.constructor(i,i,i);
            }
            if (i == 1300){
                this.constructor(i,i,i);
            }
            if (i == 1400){
                this.constructor(i,i,i);
            }
            if (i == 1500){
                this.constructor(i,i,i);
            }
            if (i == 1600){
                this.constructor(i,i,i);
            }
            if (i == 1700){
                this.constructor(i,i,i);
            }
            if (i == 1800){
                this.constructor(i,i,i);
            }
            if (i == 1900){
                this.constructor(i,i,i);
            }
            if (i == 2000){
                this.constructor(i,i,i);
            }
           
       }
        
      }
    
      draw() {
        //console.log('Circle with aristas ' + _aristas.get(this));
        this.createMatrix();
        return _pile;
      }
}

