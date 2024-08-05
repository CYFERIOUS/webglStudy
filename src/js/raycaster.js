import * as THREE from 'three';
import {Light} from './lights.js';
import { Lensflare, LensflareElement } from '../../node_modules/three/examples/jsm/objects/Lensflare.js';

import img1 from '../images/lensflare0.png';
import img2 from '../images/lensflare2.png';
import img3 from '../images/lensflare2.png';
let rayCast, rayo, rango, valor, light, textureFlare0, textureFlare1,textureFlare2;

export class Raycaster{

    constructor(mouse,_camera) {
      rayCast = new THREE.Raycaster();
      rayCast.setFromCamera(mouse,_camera);
      rayo = rayCast.ray;
      rango = Math.floor(Math.random() * (10000 - (4000)) + (4000));
      valor = rayo.at(rango,new THREE.Vector3( 0, 0, 1 ));

        var color = this.randomColor();

        this.textureLoader();
        let flare = this.createLensFlare();
        this.createLight(color,flare);

    }

    textureLoader(){
      const textureLoader = new THREE.TextureLoader();
      textureFlare0 = textureLoader.load( img1 );
      textureFlare1 = textureLoader.load( img2 );
      textureFlare2 = textureLoader.load( img3 );
    }

    createLensFlare(){


      const lensflare = new Lensflare();

      lensflare.addElement( new LensflareElement( textureFlare0, 512, 0 ) );
      lensflare.addElement( new LensflareElement( textureFlare1, 512, 0 ) );
      lensflare.addElement( new LensflareElement( textureFlare2, 60, 0.6 ) );

      return lensflare;
    }

    createLight(color,lensflare){
      light = new THREE.PointLight( color , 10, 5000, 2 );
      light.power = (100 * (9*3.1416));
      light.position.set( valor.x,valor.y,valor.z );
      light.add( lensflare );
    }

    randomColor(){
      return '#'+Math.floor(Math.random()*0xffffff).toString(16).toUpperCase();
    }

    intersectObjects(_scene){
      let intersectos = rayCast.intersectObjects(_scene.children);
      console.log(intersectos);
      intersectos.forEach((item, i) => {
          item.object.material.opacity = 0.1;
          item.object.position.z = 3000;
          item.object.rotation.z = 45;
        //_scene.remove(item.object);
      //  item.object.position.x = item.object.position.x + x;
        console.log(item.object);
        console.log(i);
      });
    }

    draw(){

        return light;
    }

}
