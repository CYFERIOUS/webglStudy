import * as THREE from 'three';

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
import img1 from '../images/lensflare0.png';
import img2 from '../images/lensflare2.png';
import img3 from '../images/lensflare2.png';

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
const lighting = new Light();
const pointLightHelper = [];
let dLightHelper1, dLightHelper2,hemiHelper,spotLightHelper,spotLightHelper2,spotLightHelper3,spotLightHelper4;
let theta = 0;
let gamma = 0;
let ball;
let cameraBall;
export class Canvas{

    constructor(){

        _scene = new THREE.Scene();
        //_scene.background = new THREE.Color( 0x909ead );
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



    animate(){
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

                for (let i in _octahedron){
                    _octahedron[i].rotation.x += (ADDX*i);
                    _octahedron[i].rotation.y += (ADDY*i);

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

            }
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
                 this.primitiveAdder(true,_currentGeo);
                 //this.normalsAdder(activeNormals,_currentGeo);
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
        let mouse = {};
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
        let rayCast = new THREE.Raycaster();
        rayCast.setFromCamera(mouse,_camera);
         let rayo = rayCast.ray;
         let rango = Math.floor(Math.random() * (2000 - (-2000))) + (-2000);
         let valor = rayo.at(rango,new THREE.Vector3( 0, 0, 1 ));
        console.log(valor);
        var color = '#'+Math.floor(Math.random()*0xffffff).toString(16).toUpperCase();
        const light = new THREE.PointLight( color , 10, 5000, 2 );
        light.power = (100 * (9*3.1416));
        light.position.set( valor.x,valor.y,valor.z );
        let ph = new THREE.PointLightHelper( light, 5 );
        _scene.add(ph);
        const textureLoader = new THREE.TextureLoader();
        const textureFlare0 = textureLoader.load( img1 );
        const textureFlare1 = textureLoader.load( img2 );
        const textureFlare2 = textureLoader.load( img3 );

        const lensflare = new Lensflare();

        lensflare.addElement( new LensflareElement( textureFlare0, 512, 0 ) );
        lensflare.addElement( new LensflareElement( textureFlare1, 512, 0 ) );
        lensflare.addElement( new LensflareElement( textureFlare2, 60, 0.6 ) );

        light.add( lensflare );
        _scene.add( light );
        //_scene.add(_light.bulb4[0].position.set(valor));
        /*let intersectos = rayCast.intersectObjects(_scene.children);
        console.log(intersectos);
        intersectos.forEach((item, i) => {
            item.object.material.opacity = 0.1;
            item.object.position.z = 3000;
            item.object.rotation.z = 45;
          //_scene.remove(item.object);
        //  item.object.position.x = item.object.position.x + x;
          console.log(item.object);
          console.log(i);
        });*/

        //
    }



}
