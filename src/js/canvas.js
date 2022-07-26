import * as THREE from 'three';

import {Cube} from './cube.js';
import {Sphere} from './sphere.js';
import {Torus} from './torus.js';
import {Light} from './lights.js';

let _scene;
let _camera;
let _renderer;
let _axis;
let _cubo = new Array();
let _light = {};
let _rDomELement;
let _animating = false;
let _sphere = new Array();
let _torus = new Array();


const cube = new Cube(100,100,100);
const sphere = new Sphere(500,30,30);
const torus = new Torus(100,20,30,30);
const lighting = new Light();

export class Canvas{

    constructor(Cube){

        _scene = new THREE.Scene();
        _scene.background = new THREE.Color( 0x909ead );
        _camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
        _camera.position.z = 5000;
        _axis = new THREE.AxesHelper( 5000 );
        _axis.position.set( 0, 0, 0 );
        _cubo = cube.draw();
        _sphere = sphere.draw();
        _torus = torus.draw();
        _light = lighting.drawLights();
    }

    animate(){

        
        requestAnimationFrame(() =>{
            this.animate();
            if(_animating){
                for (let i in _cubo){
                    _cubo[i].rotation.x += (0.001*i);
                    _cubo[i].rotation.y += (0.002*i);
                }
                for (let i in _sphere){
                    _sphere[i].rotation.x += (0.001*i);
                    _sphere[i].rotation.y += (0.002*i);
                }
                for (let i in _torus){
                    _torus[i].rotation.x += (0.001*i);
                    _torus[i].rotation.y += (0.002*i);
                }
            }
            _renderer.render( _scene, _camera );
        });
    }
   
    draw() {
        
        var random = Math.round(Math.random() * (3 - 1) + 1);

        switch(random){
            case 1:
                this.cubeAdder();
            break;
            case 2:
                this.sphereAdder();
            break;
            case 3:
                this.torusAdder();
            break;
        }
        
       

        _scene.add( _light.bulb1 );
        _scene.add( _light.bulb2 );
        _scene.add( _light.bulb3 );
        
        _renderer = new THREE.WebGLRenderer();
        _renderer.setSize( window.innerWidth, window.innerHeight );
        _rDomELement = _renderer.domElement;
        document.body.appendChild( _rDomELement );
      

    }

    cubeAdder(){
        for (let i in _cubo){
             _scene.add( _cubo[i] );
        }   
    }

    sphereAdder(){
        for (let i in _sphere){
            _scene.add(_sphere[i]);
        }   
    }

    torusAdder(){
        for (let i in _torus){
            _scene.add(_torus[i]);
        }   
    }

    addMouseHandler(){
        
        _rDomELement.addEventListener('click',this.onMouseUp,false);

    }

    onMouseUp(event){
        
        event.preventDefault();
        _animating = !_animating;
    }
}






