import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

import {Cube} from './cube.js';
import {Sphere} from './sphere.js';
import {Torus} from './torus.js';
import {RandomGeo} from './randomGeo.js';
import {Octahedron} from './octahedron.js';
import {RandomTriangle} from './randomRTriangle.js';
import {Plane} from './plane.js';
import {Light} from './lights.js';
import { VertexNormalsHelper } from '../../node_modules/three/examples/jsm/helpers/VertexNormalsHelper.js';
import { Lensflare, LensflareElement } from '../../node_modules/three/examples/jsm/objects/Lensflare.js';
import { Modeloader} from './modeloader.js'

import { Raycaster } from './raycaster.js'

import imgb from '../images/cosmic.jpg';



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
let _octahedron = new Array(1000,1000,1000,1000,500);
let _llanura = new Array();
let _rt = new Array();
let activeNormals = true;
let normals = new Array();
let _currentGeo = new Array();

const cube = new Cube(100,100,100);
const sphere = new Sphere(500,30,30);
const torus = new Torus(100,20,30,30);
const randomShape = new RandomGeo(100,100,100,100);
const octahedron = new Octahedron(100,100,100,100,100);
const rtrigono = new RandomTriangle(1000,1000,1000);
const planicie = new Plane(10000,10000,10,10);
const ship = new Modeloader();
const lighting = new Light();
const pointLightHelper = [];
let dLightHelper1, dLightHelper2,hemiHelper,spotLightHelper,spotLightHelper2,spotLightHelper3,spotLightHelper4;
let theta = 0;
let gamma = 0;
let ball;
let cameraBall;
let mouse = {};
let shipFBX;
let ray;
let photon;
let ph;


export class Canvas{

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


        _cubo = cube.draw();
        _geoRand = randomShape.draw();
        _sphere = sphere.draw();
        _torus = torus.draw();
        _llanura = planicie.draw();
        _octahedron = octahedron.draw();
        _rt = rtrigono.draw();
        _light = lighting.drawLights();

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


        requestAnimationFrame(() =>{
            this.animate();

            let ADDX = 0.005;
            let ADDY = 0.002;

            if(_animating){
                for (let i in _currentGeo){
                    _currentGeo[i].rotation.x += (ADDX*i);
                    _currentGeo[i].rotation.y += (ADDY*i);

                }

                for (let i in _light.bulb4){
                  const quaternion = new THREE.Quaternion();
                  quaternion.setFromAxisAngle( new THREE.Vector3( 0, 0, 1 ), theta );
                  _light.bulb4[i].applyQuaternion(quaternion);
                  _light.bulb4[i].applyQuaternion(quaternion);
                  _light.bulb4[0].position.x = 3000*Math.sin(theta);
                  _light.bulb4[0].position.z = 3000*Math.cos(theta);
                  _light.bulb4[1].position.x = -3000*Math.sin(theta);
                  _light.bulb4[1].position.z = 3000*Math.cos(theta);
                  theta += ADDX;
                }
                for (let i in normals){
                    normals[i].update();
                }

                if(shipFBX){
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
     document.addEventListener("keydown", event => {
         switch(event.key){
             case '1':
                 this.normalsAdder(false,_currentGeo);
                 _currentGeo = _cubo;
                 this.shipMaker(false);
                 this.primitiveAdder(true,_cubo);
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
                 this.primitiveAdder(false,_cubo);
                 this.shipMaker(false);
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
                 this.primitiveAdder(false,_cubo);
                 this.primitiveAdder(false,_sphere);
                 this.shipMaker(false);
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
                 this.primitiveAdder(false,_cubo);
                 this.primitiveAdder(false,_sphere);
                 this.primitiveAdder(false,_torus);
                 this.primitiveAdder(false,_octahedron);
                 this.primitiveAdder(false,_rt);
                 this.shipMaker(false);
                 this.primitiveAdder(true,_geoRand);
                 this.normalsAdder(activeNormals,_currentGeo);
                 activeNormals = !activeNormals;
             break;
             case '5':
                 this.normalsAdder(false,_currentGeo);
                 _currentGeo = _octahedron;
                 this.primitiveAdder(false,_cubo);
                 this.primitiveAdder(false,_sphere);
                 this.primitiveAdder(false,_torus);
                 this.primitiveAdder(false,_geoRand);
                 this.primitiveAdder(false,_rt);
                 this.shipMaker(false);
                 this.primitiveAdder(true,_currentGeo);
                 this.normalsAdder(activeNormals,_currentGeo);
                 activeNormals = !activeNormals;
             break;
             case '6':
                 this.normalsAdder(false,_currentGeo);
                 _currentGeo = _rt;
                 this.primitiveAdder(false,_cubo);
                 this.primitiveAdder(false,_sphere);
                 this.primitiveAdder(false,_torus);
                 this.primitiveAdder(false,_geoRand);
                 this.primitiveAdder(false,_octahedron);
                 this.shipMaker(false);
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

           }
     });
   }
   lightSwitcher(){
     document.addEventListener("keydown", event => {
         switch(event.key){
           case 'a':
               this.ambient_Lights();
           break;
           case 'b':
               this.hemisphere_Lights();
           break;
           case 'c':
             this.directional_Lights();
           break;
           case 'd':
               this.point_Lights();
           break;
           case 'e':
                 this.spot_Lights();
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

    ambient_Lights(){
        _scene.add( _light.bulb1 );

        _scene.remove(_light.bulb2);
        this.removeLights(_light.bulb3);
        this.removeLights(_light.bulb3);
        this.removeLights(_light.bulb4);
        this.removeLights(_light.bulb5);

        this.removeHelper(hemiHelper);
        this.removeHelper(dLightHelper1);
        this.removeHelper(dLightHelper2);
        this.removeHelper(pointLightHelper[0]);
        this.removeHelper(pointLightHelper[1]);
        this.removeHelper(spotLightHelper);
        this.removeHelper(spotLightHelper2);
        this.removeHelper(spotLightHelper3);
        this.removeHelper(spotLightHelper4);


    }
    hemisphere_Lights(){
          _scene.add( _light.bulb2 );
          hemiHelper = new THREE.HemisphereLightHelper( _light.bulb2, 300 );
          _scene.add( hemiHelper );

          _scene.remove(_light.bulb1);
          this.removeLights(_light.bulb3);
          this.removeLights(_light.bulb4);
          this.removeLights(_light.bulb5);

          this.removeHelper(dLightHelper1);
          this.removeHelper(dLightHelper2);
          this.removeHelper(pointLightHelper[0]);
          this.removeHelper(pointLightHelper[1]);
          this.removeHelper(spotLightHelper);
          this.removeHelper(spotLightHelper2);
          this.removeHelper(spotLightHelper3);
          this.removeHelper(spotLightHelper4);


    }
    directional_Lights(){
        _scene.add( _light.bulb3[0] );
        _scene.add( _light.bulb3[1] );
         dLightHelper1 = new THREE.DirectionalLightHelper( _light.bulb3[0], 800, 0x000000 );
        _scene.add( dLightHelper1 );
         dLightHelper2 = new THREE.DirectionalLightHelper( _light.bulb3[1], 800, 0x000000 );
         _scene.add( dLightHelper2 );

         _scene.remove(_light.bulb1);
         _scene.remove(_light.bulb2);
         this.removeLights(_light.bulb4);
         this.removeLights(_light.bulb5);

         this.removeHelper(hemiHelper);
         this.removeHelper(pointLightHelper[0]);
         this.removeHelper(pointLightHelper[1]);
         this.removeHelper(spotLightHelper);
         this.removeHelper(spotLightHelper2);
         this.removeHelper(spotLightHelper3);
         this.removeHelper(spotLightHelper4);

    }
    point_Lights(){
      _scene.add( _light.bulb4[0] );
      _scene.add( _light.bulb4[1] );
     pointLightHelper[0] = new THREE.PointLightHelper( _light.bulb4[0], 300 );
     pointLightHelper[1] = new THREE.PointLightHelper( _light.bulb4[1], 300 );
      _scene.add( pointLightHelper[0] );
      _scene.add( pointLightHelper[1] );

      _scene.remove(_light.bulb1);
      _scene.remove(_light.bulb2);
      this.removeLights(_light.bulb3);
      this.removeLights(_light.bulb5);

      this.removeHelper(hemiHelper);
      this.removeHelper(dLightHelper1);
      this.removeHelper(dLightHelper2);
      this.removeHelper(spotLightHelper);
      this.removeHelper(spotLightHelper2);
      this.removeHelper(spotLightHelper3);
      this.removeHelper(spotLightHelper4);

    }
    spot_Lights(){
      _scene.add( _light.bulb5[0] );
      _scene.add( _light.bulb5[1] );
      _scene.add( _light.bulb5[2] );
      _scene.add( _light.bulb5[3] );

      spotLightHelper = new THREE.SpotLightHelper( _light.bulb5[0] );
      _scene.add( spotLightHelper );
      spotLightHelper2 = new THREE.SpotLightHelper( _light.bulb5[1] );
      _scene.add( spotLightHelper2 );
      spotLightHelper3 = new THREE.SpotLightHelper( _light.bulb5[2] );
      _scene.add( spotLightHelper3 );
      spotLightHelper4 = new THREE.SpotLightHelper( _light.bulb5[3] );
      _scene.add( spotLightHelper4 );

      _scene.remove(_light.bulb1);
      _scene.remove(_light.bulb2);
      this.removeLights(_light.bulb3);
      this.removeLights(_light.bulb4);

      this.removeHelper(hemiHelper);
      this.removeHelper(dLightHelper1);
      this.removeHelper(dLightHelper2);
      this.removeHelper(pointLightHelper[0]);
      this.removeHelper(pointLightHelper[1]);



    }
    removeHelper(helper){
      _scene.remove(helper);
    }
    removeLights(focus){
      for(let i in focus){
        _scene.remove(focus[i]);
      }
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

    draw() {
        //_scene.add(_axis)

          this.cameraSwitcher();
          this.geometrySwitcher();
          this.lightSwitcher();
          this.animationSwitcher();

        _renderer = new THREE.WebGLRenderer();
        _renderer.setSize( window.innerWidth, window.innerHeight );
        _rDomELement = _renderer.domElement;
        document.body.appendChild( _rDomELement );
    }

    addMouseHandler(){
        _rDomELement.addEventListener('mousedown',this.onMouseDown,false);
        _rDomELement.addEventListener('mousemove',this.onMouseMove,false);
        _rDomELement.addEventListener('mouseup',this.onMouseUp,false);
    }
    onMouseMove(){

    }
    onMouseUp(){
      for(let i in _currentGeo){
        _currentGeo[i].position.x = 0;
        _currentGeo[i].position.y = 0;
        _currentGeo[i].position.z = 0;
        _currentGeo[i].scale.x = 1;
        _currentGeo[i].scale.y = 1;
        _currentGeo[i].scale.z = 1;
        _currentGeo[i].rotation.z = 0;
      }
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

        for(let i in _currentGeo){
          _currentGeo[i].position.x = mouse.x*1000;
          _currentGeo[i].position.y = mouse.y*1000;
          _currentGeo[i].position.z = mouse.z*1000;
          _currentGeo[i].scale.x = 1.3;
          _currentGeo[i].scale.y = 1.3;
          _currentGeo[i].scale.z = 1.3;


        }
        ray = new Raycaster(mouse,_camera);
        photon = ray.draw();
        ray.intersectObjects(_scene);
        ph = new THREE.PointLightHelper( photon, 5 );
        _scene.add(ph);
        _scene.add( photon );

    }



}
