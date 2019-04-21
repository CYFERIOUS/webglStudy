import * as THREE from 'three';

import {Cube} from './cube.js';
import {Light} from './lights.js';

let _scene;
let _camera;
let _renderer;
let _axis;
let _cubo = new Array();
let _light = {};


const cube = new Cube(100,100,100);
const lighting = new Light();

export class Canvas{

    constructor() {
        _scene = new THREE.Scene();
        _scene.background = new THREE.Color( 0x909ead );
        _camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
        _camera.position.z = 5000;
        _axis = new THREE.AxesHelper( 500 );
        _axis.position.set( 0, 0, 0 );
        _cubo = cube.draw();
        _light = lighting.drawLights();
    }

    animate(){
        requestAnimationFrame(() =>{
            this.animate();
            for (let i in _cubo){
                _cubo[i].rotation.x += (0.001*i);
                _cubo[i].rotation.y += (0.002*i);
            }
            _renderer.render( _scene, _camera );
        });
    }
    
    draw() {
        for (let i in _cubo){
             _scene.add( _cubo[i] );
        }

        _scene.add( _light.bulb1 );
        _scene.add( _light.bulb2 );
        _scene.add( _light.bulb3 );
       
        _renderer = new THREE.WebGLRenderer();
        _renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( _renderer.domElement );
      

    }
}






