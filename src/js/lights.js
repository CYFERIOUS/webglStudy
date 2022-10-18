import * as THREE from 'three';


let a_point = [];
let _points;
let _points1;
let _points2;


let a_spot = [];
let _spot;
let spot1;
let spot2;
let spot3;
let spot4;


let _directional;
let a_directional = [];
let _direct1;
let _direct2;

let _lumen;
let _ambient;
let _hemiSphere;

export class Light{
	constructor(){


				 this.ambientLight();
				 this.hemisphereLight();
				 _direct1 = this.directionalLight(0x005a7c,3000,1500,1500);
				 _direct2 = this.directionalLight(0xF0D438,-3000,-1500,-1500);
				 a_directional.push(_direct1);
				 a_directional.push(_direct2);
				 spot1 = this.spotLight(0x175fe0,0,3000,0);
				 spot2 = this.spotLight(0x107A4C,0,-3000,0);
				 spot3 = this.spotLight(0xFFB566,3000,0,0);
				 spot3 = this.spotLight(0xFFFA66,3000,0,0);
				 spot4 = this.spotLight(0xA31902,-3000,0,0);
				 a_spot.push(spot1);
				 a_spot.push(spot2);
				 a_spot.push(spot3);
				 a_spot.push(spot4);
				 _points1 = this.pointLight(0xEB713D,3000,0,0);
				 a_point.push(_points1);
				 _points2 = this.pointLight(0x9E3609,-3000,0,0);
				 a_point.push(_points2);

	}

	ambientLight(){
		  _ambient = new THREE.AmbientLight( 0x29EB41 );
	}

	hemisphereLight(){
			return _hemiSphere = new THREE.HemisphereLight(0xF0D438,0x7B3DEB,0.9);
	}
	directionalLight(color, px, py,pz){

				 _directional = new THREE.DirectionalLight( color, 1 );
				 _directional.position.x = px;
				 _directional.position.x = py;
				 _directional.position.x = pz;

				 return _directional;

	}
	pointLight(color,px,py,pz){
				_points = new THREE.PointLight( color, 1 , 0 , 0.8 );
				_points.power = (10000 * (9*3.1416));
				_points.position.set(px,py,pz);

				return _points;
	}
	spotLight(color,p1,p2,p3){
				_spot = new THREE.SpotLight(color,1);
				_spot.position.set(p1,p2,p3);
				_spot.angle = Math.PI / 4;
				_spot.penumbra = 0.05;
				_spot.decay = 0;
				_spot.distance = 2000;

				return _spot;
	}



	drawLights(){
		_lumen = {
			bulb1: _ambient,
			bulb2: _hemiSphere,
			bulb3: a_directional,
			bulb4: a_point,
			bulb5: a_spot,


		};
		return _lumen;
	}
}
