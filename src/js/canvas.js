import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

import {Cube} from './cube.js';
import {Sphere} from './sphere.js';
import {Torus} from './torus.js';
import {RandomGeo} from './randomGeo.js';
import {Octahedron} from './octahedron.js';
import {RandomTriangle} from './randomRTriangle.js';
import {Plane} from './plane.js';
import {Startrek} from './startrek.js';
import {Light} from './lights.js';
import {LightManager} from './lightManager.js';
import { VertexNormalsHelper } from '../../node_modules/three/examples/jsm/helpers/VertexNormalsHelper.js';

import { Modeloader} from './modeloader.js'
import { Raycaster } from './raycaster.js'

import imgb from '../images/cosmic.jpg';

let _scene;
let _camera;
let _renderer;
let _axis;
let _cubo = new Array();
let _rDomELement;
let _animating = false;
let _sphere = new Array();
let _torus = new Array();
let _geoRand = new Array();
let _currentCopy = new Array();
let _octahedron = new Array(1000,1000,1000,1000,500);

let _llanura = new Array();
let _rt = new Array();
let activeNormals = true;
let normals = new Array();
let _currentGeo = new Array();
let _starShape = new Array();

const cube = new Cube(100,100,100);
const sphere = new Sphere(500,30,30);
const torus = new Torus(100,20,30,30);
const randomShape = new RandomGeo(100,100,100,100);
const octahedron = new Octahedron(100,100,100,100,100);
const rtrigono = new RandomTriangle(1000,1000,1000);
const planicie = new Plane(10000,10000,10,10);
const ship = new Modeloader();
const startoko = new Startrek(100,100,100);
const clock = new THREE.Clock(); 


let lights;

let gamma = 0;
let ball;
let cameraBall;
let mouse = {};
let shipFBX;
let ray;
let photon;
let ph;


    const intersectionPoint = new THREE.Vector3();
    const planeNormal = new THREE.Vector3();
    const plane = new THREE.Plane();

export class Canvas{


    geometries(){
      _cubo = cube.draw();
      _geoRand = randomShape.draw();
      _sphere = sphere.draw();
      _torus = torus.draw();
      _llanura = planicie.draw();
      _octahedron = octahedron.draw();
      _rt = rtrigono.draw();
      _starShape = startoko.draw();
    }

    constructor(){

        _scene = new THREE.Scene();
        const textureLoader = new THREE.TextureLoader();
        let planetas = textureLoader.load( imgb );
        _scene.background = planetas;
        _camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        _camera.position.z = 5000;
        const cameraHelper = new THREE.CameraHelper( _camera );
        //_scene.add( cameraHelper );
        _axis = new THREE.AxesHelper( 5000 );
        _axis.position.set( 0, 0, 0 );
        //_scene.add(_axis);
        _scene.add(_camera);
        this.geometries();
        
        lights = new LightManager(_scene);
    }



    animate(time){
      let myInterval;

      document.addEventListener("keydown", event => {
          if(event.key=='k'){
              console.log("kboom");
              //const delay = 1;
              const limit = 2;
              let i = 1;
              const limitedInterval = setInterval(() => {
                  rtrigono.move();
                  if (i > limit) {
                    clearInterval(limitedInterval);
                    console.log('interval cleared!');
                  }
              },  100);
          }
      });

      const elapsedTime = clock.getElapsedTime();
        requestAnimationFrame(() =>{
         
            this.animate();
            
            //angularVelocity
            let ADDX = 0.05;
            let ADDY = 0.03;
            let ADDZ = 0.01;

            let angularDeplacementX = elapsedTime*ADDX;
            let angularDeplacementY = elapsedTime*ADDY;
            let angularDeplacementZ = elapsedTime*ADDZ;

            if(_animating){
              //i is the differential index 
                for (let i in _currentGeo){
                    _currentGeo[i].applyMatrix( new THREE.Matrix4().makeRotationX(angularDeplacementX*i) );
                    _currentGeo[i].applyMatrix( new THREE.Matrix4().makeRotationY(angularDeplacementY*i) );
                    _currentGeo[i].applyMatrix( new THREE.Matrix4().makeRotationZ(angularDeplacementY*i) );
                }
                lights.animatePointLights();

                for (let i in normals){
                    normals[i].update();
                }

                if(shipFBX && photon){
                  let destination = new THREE.Vector3(photon.position.x,photon.position.y,photon.position.z);
                  console.log(destination);
                  let tween1 = new TWEEN.Tween( shipFBX.position ).to( destination , 10000 );
                  let tween2 = new TWEEN.Tween( shipFBX.scale ).to( {x:shipFBX.scale.x/2,y:shipFBX.scale.y/2,z:shipFBX.scale.z/2} , 10000 );
                  shipFBX.lookAt(destination);
                  tween1.start();
                  tween2.start();
                }



            }
              TWEEN.update(time);
            _renderer.render( _scene, _camera );
        });
    }



   cameraSwitcher(){
     let CDDX = 0.005;
     document.addEventListener("keydown", event => {
         switch(event.key){
           case 'o':
             _camera = new THREE.OrthographicCamera( window.innerWidth / - 0.3, window.innerWidth / 0.3, window.innerHeight / 0.3, window.innerHeight / - 0.3, 1, 10000 );
             _camera.position.z = 5000;
           break;
           case 'p':
             _camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
             _camera.position.z = 5000;
           break;
           case 'ArrowUp':

            _camera.position.y = 5000 * Math.cos(gamma/2);
            _camera.position.z = 5000 * Math.sin(gamma/2);
            _camera.lookAt(0,0,0);
             _camera.updateProjectionMatrix();
             gamma -= CDDX;
           break;
           case 'ArrowDown':
             _camera.position.y = 5000 * Math.cos(gamma/2);
             _camera.position.z = 5000 * Math.sin(gamma/2);
             _camera.lookAt(0,0,0);
             _camera.updateProjectionMatrix();
             gamma += CDDX;
           break;
           case 'ArrowRight':
              _camera.position.x = 5000 * Math.cos(gamma);
              _camera.position.z = 5000 * Math.sin(gamma);
              _camera.lookAt(0,0,0);
              _camera.updateProjectionMatrix();
              gamma += CDDX;
           break;
           case 'ArrowLeft':
              _camera.position.x = 5000 * Math.cos(gamma);
              _camera.position.z = 5000 * Math.sin(gamma);
              _camera.lookAt(0,0,0);
              _camera.updateProjectionMatrix();
              gamma -= CDDX;
           break;

         }

     });
   }

   geometrySwitcher(){
     this.primitiveAdder(true,_cubo);
     _currentGeo = _cubo;
     document.addEventListener("keydown", (e) => {
      
  
     
         switch(e.key){
          
             case '1':
                 this.normalsAdder(false,_currentGeo);
                 _currentGeo = _cubo;
                 this.shipMaker(false);
                 this.primitiveAdder(true,_currentGeo);
                 this.primitiveAdder(false,_sphere);
                 this.primitiveAdder(false,_torus);
                 this.primitiveAdder(false,_octahedron);
                 this.primitiveAdder(false,_geoRand);
                 this.primitiveAdder(false,_rt); 
                 this.normalsAdder(activeNormals,_currentGeo);
                 activeNormals = !activeNormals;
             break;
             case '2':
                 this.normalsAdder(false,_currentGeo);
                 _currentGeo = _sphere;
                 this.shipMaker(false);
                 this.primitiveAdder(false,_cubo);
                 this.primitiveAdder(true,_sphere);
                 this.primitiveAdder(false,_torus);
                 this.primitiveAdder(false,_octahedron);
                 this.primitiveAdder(false,_geoRand);
                 this.primitiveAdder(false,_rt);
                 this.normalsAdder(activeNormals,_currentGeo);
                 activeNormals = !activeNormals; 
             break;
             case '3':
            
                 this.normalsAdder(false,_currentGeo);
                 _currentGeo = _torus;
                 this.shipMaker(false);
                  this.primitiveAdder(false,_cubo);
                 this.primitiveAdder(false,_sphere);
                 this.primitiveAdder(true,_torus);
                 this.primitiveAdder(false,_octahedron);
                 this.primitiveAdder(false,_rt);
                 this.primitiveAdder(false,_geoRand);
                 this.normalsAdder(activeNormals,_currentGeo);
                 activeNormals = !activeNormals; 
             break;
             case '4':
                 this.normalsAdder(false,_currentGeo);
                 _currentGeo = _geoRand;
                 this.shipMaker(false);
                 this.primitiveAdder(false,_cubo);
                 this.primitiveAdder(false,_sphere);
                 this.primitiveAdder(false,_torus);
                 this.primitiveAdder(false,_octahedron);
                 this.primitiveAdder(false,_rt);
                 this.primitiveAdder(true,_geoRand);
                 this.normalsAdder(activeNormals,_currentGeo);
                 activeNormals = !activeNormals; 
             break;
             case '5':
                 this.normalsAdder(false,_currentGeo);
                 _currentGeo = _octahedron;
                 this.shipMaker(false);
                 this.primitiveAdder(false,_cubo);
                 this.primitiveAdder(false,_sphere);
                 this.primitiveAdder(false,_torus);
                 this.primitiveAdder(false,_geoRand);
                 this.primitiveAdder(false,_rt);
                 this.primitiveAdder(true,_currentGeo);
                 this.normalsAdder(activeNormals,_currentGeo);
                 activeNormals = !activeNormals; 
             break;
             case '6':
                 this.normalsAdder(false,_currentGeo);
                 _currentGeo = _rt;
                 this.shipMaker(false);
                  this.primitiveAdder(false,_cubo);
                 this.primitiveAdder(false,_sphere);
                 this.primitiveAdder(false,_torus);
                 this.primitiveAdder(false,_geoRand);
                 this.primitiveAdder(false,_octahedron);
                 this.primitiveAdder(true,_currentGeo);
                 activeNormals = !activeNormals;
             break;
             case '7':
             this.primitiveAdder(false,_cubo);
             this.primitiveAdder(false,_sphere);
             this.primitiveAdder(false,_torus);
             this.primitiveAdder(false,_geoRand);
             this.primitiveAdder(false,_octahedron);
             this.primitiveAdder(false,_rt);
             this.shipMaker(true);
             activeNormals = !activeNormals;
             break;
             case '8':  
             _currentGeo = _starShape;
             this.primitiveAdder(true,_currentGeo);
             this.primitiveAdder(false,_cubo);
             this.primitiveAdder(false,_sphere);
             this.primitiveAdder(false,_torus);
             this.primitiveAdder(false,_geoRand);
             this.primitiveAdder(false,_octahedron);
             this.primitiveAdder(false,_rt);
             this.shipMaker(false);
             _scene.add(_currentGeo);
             activeNormals = !activeNormals;
             break;


           }
           
     });
   }
   lightSwitcher(){
     document.addEventListener("keydown", event => {
         switch(event.key){
           case 'a':
               lights.ambient_Lights(_scene);
           break;
           case 'b':
               lights.hemisphere_Lights(_scene);
           break;
           case 'c':
             lights.directional_Lights(_scene);
           break;
           case 'd':
               lights.point_Lights(_scene);
           break;
           case 'e':
                 lights.spot_Lights(_scene);
           break;
         }
     });
   }

    animationSwitcher(){
      document.addEventListener("keydown", event => {
          if(event.key == ' '){
            //alert("llamao")
            _animating = !_animating;
          }
      });
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

    normalsAdder(activeNormals,_geometry){
         for (let i in _geometry) {
            if (activeNormals) {
                let temp = new VertexNormalsHelper( _geometry[i], 500, 0x1762e5, 10 );
                normals[i] = temp;
                _scene.add(temp);
            } else {
                _scene.remove(normals[i]);
            }
        }

    }

    shipMaker(active){

        setTimeout(() => {
              shipFBX = ship.draw();
              shipFBX.position.x = 0;
              shipFBX.position.y = 0;
              shipFBX.position.z = 0;
              if(active){
                _scene.add(shipFBX);
                console.log(shipFBX.position);
              }else{
                _scene.remove(shipFBX);
              }
        }, 2000);
    }

    draw(renderWidth, renderHeight) {
        //_scene.add(_axis)
          
          this.cameraSwitcher();
          this.geometrySwitcher();
          this.lightSwitcher();
          this.animationSwitcher();

          _camera.aspect = renderWidth/renderHeight;
          _camera.updateProjectionMatrix();

        _renderer = new THREE.WebGLRenderer();
        _renderer.setSize( renderWidth, renderHeight );
        _renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
        _rDomELement = _renderer.domElement;
        document.body.appendChild( _rDomELement );
    }
    addMouseHandler(){
        _rDomELement.addEventListener('mousedown',this.onMouseDown,false);
        _rDomELement.addEventListener('mousemove',this.onMouseMove,false);
        _rDomELement.addEventListener('mouseup',this.onMouseUp,false);
    }
    onMouseMove(event){
       

    }
    onMouseUp(){
      
    }


    onMouseDown(event){
      
        event.preventDefault();

        let x = event.clientX;
        let y = event.clientY;

        mouse.x = (x/window.innerWidth)*2-1;
        mouse.y = -(y/window.innerHeight)*2+1;
        mouse.z = 1;
        //console.log('x'+mouse.x);
        //console.log('y'+mouse.y);

        ray = new Raycaster(mouse,_camera);
        photon = ray.draw();
        ray.intersectObjects(_scene);
        ph = new THREE.PointLightHelper( photon, 5 );
      
        _scene.add(ph);
        _scene.add( photon );
        
        for(let i in _currentGeo){
    
          _currentGeo[i].applyMatrix4( new THREE.Matrix4().clone().setPosition(photon.position.x,photon.position.y,photon.position.z) );
          //_currentGeo[i].applyMatrix( new THREE.Matrix4().makeScale(0.3,0.3,0.3));
        }
    }
    

}


