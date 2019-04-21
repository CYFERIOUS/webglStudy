import * as THREE from 'three';
import {Cube} from './cube.js';

let _scene;
let _camera;
let _renderer;
let _axis;
let _cubo = new Array();
let _pointsA;
let _pointsB;


const cube = new Cube(10,100,100,100);


export class Canvas{

    constructor() {
        _scene = new THREE.Scene();
        _scene.background = new THREE.Color( 0x999999 );
        _camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
        _camera.position.z = 5000;
        _axis = new THREE.AxesHelper( 500 );
        _axis.position.set( 0, 0, 0 );
        _cubo = cube.draw();

        _pointsA = new THREE.PointLight( 0xffffff, 10 , 20 , 0 );
        _pointsA.power = (2 * (9*3.1416));
        _pointsA.position.set( 3000, 800, 0 );

        _pointsB = new THREE.PointLight( 0x175fe0, 10 , 20 , 0 );
        _pointsB.power = (2 * (9*3.1416));
        _pointsB.position.set( -3000, -800, 0 );

        
    }

    animate(){
        requestAnimationFrame(() =>{
            this.animate();
            for (var i = 0; i<15; i++){
            if(i==0){
                _cubo[0].rotation.x += 0.001;
                _cubo[0].rotation.y += 0.002;
            }
            if(i==1){
                _cubo[1].rotation.x += 0.003;
                _cubo[1].rotation.y += 0.004;
            }
            if(i==2){
               _cubo[2].rotation.x += 0.005;
                _cubo[2].rotation.y += 0.006;
            }
            if(i==3){
                _cubo[3].rotation.x += 0.007;
                _cubo[3].rotation.y += 0.008;
            }
            if(i==4){
                _cubo[4].rotation.x += 0.009;
                _cubo[4].rotation.y += 0.010;
            }
            if(i==5){
                _cubo[5].rotation.x += 0.011;
                _cubo[5].rotation.y += 0.012;
            }
            if(i==6){
                _cubo[6].rotation.x += 0.013;
                _cubo[6].rotation.y += 0.014;
            }
            if(i==7){
                _cubo[7].rotation.x += 0.015;
                _cubo[7].rotation.y += 0.016;
            }
            if(i==8){
                _cubo[8].rotation.x += 0.017;
                _cubo[8].rotation.y += 0.018;
            }
            if(i==9){
                _cubo[9].rotation.x += 0.018;
                _cubo[9].rotation.y += 0.019;
            }
            if(i==10){
                _cubo[10].rotation.x += 0.020;
                _cubo[10].rotation.y += 0.021;
            }
            if(i==11){
                _cubo[11].rotation.x += 0.022;
                _cubo[11].rotation.y += 0.023;
            }
            if(i==12){
                _cubo[12].rotation.x += 0.024;
                _cubo[12].rotation.y += 0.025;
            }
            if(i==13){
               _cubo[13].rotation.x += 0.026;
               _cubo[13].rotation.y += 0.027;
            }
            if(i==14){
               _cubo[14].rotation.x += 0.028;
                _cubo[14].rotation.y += 0.029;
            }
            if(i==15){
               _cubo[15].rotation.x += 0.030;
                _cubo[15].rotation.y += 0.031;
            }
            
           
        }
            _renderer.render( _scene, _camera );
        });
    }
    
    draw() {
        for (var i = 0; i<15; i++){
             _scene.add( _cubo[i] );
        }
        _scene.add( _pointsA );
        _scene.add( _pointsB );
        _scene.add( new THREE.AmbientLight( 'skyblue' ) );
        _scene.add( _axis );
        _renderer = new THREE.WebGLRenderer();
        _renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( _renderer.domElement );
      

    }
}






