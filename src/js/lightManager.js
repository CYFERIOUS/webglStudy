import * as THREE from 'three';
import {Materials} from './materials.js';
import {Light} from './lights.js';
let _light = {};
const pointLightHelper = [];
let dLightHelper1, dLightHelper2,hemiHelper,spotLightHelper,spotLightHelper2,spotLightHelper3,spotLightHelper4;
let _scene;
let theta = 0;
export class LightManager{
    constructor(_mainScene) {
      _scene = _mainScene;
      const lighting = new Light();
      _light = lighting.drawLights();
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

      animatePointLights(){
          let ADDX = 0.005;
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
      removeLights(focus){
        for(let i in focus){
          _scene.remove(focus[i]);
        }
      }

      removeHelper(helper){
        _scene.remove(helper);
      }


}
