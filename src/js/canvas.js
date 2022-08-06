import * as THREE from 'three';

import {Cube} from './cube.js';
import {Sphere} from './sphere.js';
import {Torus} from './torus.js';
import {RandomGeo} from './randomGeo.js';
import {Plane} from './plane.js';
import {Light} from './lights.js';
import { VertexNormalsHelper } from '../../node_modules/three/examples/jsm/helpers/VertexNormalsHelper.js';


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
let _geoRand = new Array();
let _llanura = new Array();



const cube = new Cube(100,100,100);
const sphere = new Sphere(500,30,30);
const torus = new Torus(100,20,30,30);
const randomShape = new RandomGeo(100,100,100,100);
const planicie = new Plane(10000,10000,10,10);
const lighting = new Light();

export class Canvas{

    constructor(){

        _scene = new THREE.Scene();
        _scene.background = new THREE.Color( 0x909ead );
        _camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
        _camera.position.z = 5000;
        _axis = new THREE.AxesHelper( 5000 );
        _axis.position.set( 0, 0, 0 );
        _cubo = cube.draw();
        _geoRand = randomShape.draw();
        _sphere = sphere.draw();
        _torus = torus.draw();
        _llanura = planicie.draw();
        _light = lighting.drawLights();

    }

    

    animate(){

        
        requestAnimationFrame(() =>{
            this.animate();
            let ADDX = 0.001;
            let ADDY = 0.002;
            let ADDZ = 0.5;
            if(_animating){
                for (let i in _cubo){
                    _cubo[i].rotation.x += (ADDX*i);
                    _cubo[i].rotation.y += (ADDY*i);
                }
                for (let i in _sphere){
                    _sphere[i].rotation.x += (ADDX*i);
                    _sphere[i].rotation.y += (ADDY*i);
                }
                for (let i in _torus){
                    _torus[i].rotation.x += (ADDX*i);
                    _torus[i].rotation.y += (ADDY*i);
                }
                for (let i in _geoRand){
                    _geoRand[i].rotation.x += (ADDX*i);
                    _geoRand[i].rotation.y += (ADDY*i);
                    
                }
                for (let i in _llanura){
                    _llanura[i].rotation.z += (ADDZ*i);
                    
                }
            }
            _renderer.render( _scene, _camera );
        });
    }

    
   
    draw() {
        var random = Math.round(Math.random() * (5 - 1) + 1);
        
        this.primitiveAdder(true,_cubo);
        
        document.addEventListener("keydown", event => {
            switch(event.key){
                case '1':
                    this.primitiveAdder(true,_cubo);
                    this.primitiveAdder(false,_sphere);
                    this.primitiveAdder(false,_torus);
                    this.primitiveAdder(false,_geoRand);
                break;
                case '2':
                    this.primitiveAdder(false,_cubo);
                    this.primitiveAdder(true,_sphere);
                    this.primitiveAdder(false,_torus);
                    this.primitiveAdder(false,_geoRand);
                    
                break;
                case '3':
                    this.primitiveAdder(false,_cubo);
                    this.primitiveAdder(false,_sphere);
                    this.primitiveAdder(true,_torus);
                    this.primitiveAdder(false,_geoRand);
                break;
                case '4':
                    this.primitiveAdder(false,_cubo);
                    this.primitiveAdder(false,_sphere);
                    this.primitiveAdder(false,_torus);
                    this.primitiveAdder(true,_geoRand);
                    
                break;
                case '5':
                    this.llanuraAdder();
                break;

            }
        });      
        
        
        _scene.add( _light.bulb1 );
        _scene.add( _light.bulb2 );
        _scene.add( _light.bulb3 );
        
        _renderer = new THREE.WebGLRenderer();
        _renderer.setSize( window.innerWidth, window.innerHeight );
        _rDomELement = _renderer.domElement;
        document.body.appendChild( _rDomELement );
      

    }

    primitiveAdder(active,primitive){
        if(active){
            for (let i in primitive){
             _scene.add( primitive[i] );
            }  
        }else{
            for (let i in primitive){
             _scene.remove( primitive[i] );
            }
        }
    }

    llanuraAdder(){

       //const normals = new VertexNormalsHelper( _llanura, 500, 0x00ff00, 10 );
       
        for (let i in _llanura){
            const normals = new VertexNormalsHelper( _llanura[i], 500, 0x00ff00, 10 );
            _scene.add(_llanura[i]);
            _scene.add(normals);
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






