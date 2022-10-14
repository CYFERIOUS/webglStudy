import * as THREE from 'three';

let _pointsA;
let _pointsB;
let _ambientC;
let _hemiD;

let aspot = [];
let _spot;
let spot1;
let spot2;
let spot3;
let spot4;
let _directional;
let _lumen;

export class Light{
	constructor(){

				 this.pointLight();
				 this.ambientLight();
				 this.directionalLight();
				 spot1 = this.spotLight(0x175fe0,0,3000,0);
				 spot2 = this.spotLight(0x107A4C,0,-3000,0);
				 spot3 = this.spotLight(0xFFB566,3000,0,0);
				 spot3 = this.spotLight(0xFFFA66,3000,0,0);
				 spot4 = this.spotLight(0xA31902,-3000,0,0);
				 aspot.push(spot1);
				 aspot.push(spot2);
				 aspot.push(spot3);
				 aspot.push(spot4);
				 this.hemisphereLight();


	}

	ambientLight(){
		  _ambientC = new THREE.AmbientLight( 0x222222 );
	}

	hemisphereLight(){
			_hemiD = new THREE.HemisphereLight(0x175fe0,0x222222,0.6);
	}
	directionalLight(){
			  _directional = new THREE.DirectionalLight( 0x005a7c );
	}
	pointLight(){
				_pointsA = new THREE.PointLight( 0x222222, 1 , 0 , 0.8 );
				_pointsA.power = (100 * (9*3.1416));
				_pointsA.position.set( 0, 0, 0 );

				_pointsB = new THREE.PointLight( 0x175fe0, 10 , 20 , 0 );
				_pointsB.power = (9 * (9*3.1416));
				_pointsB.position.set( -3000, -800, 0 );
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
			bulb1: _pointsA,
			bulb2: _pointsB,
			bulb3: _ambientC,
			bulb4: _hemiD,
			bulb5: aspot,
			bulb6: _directional

		};
		return _lumen;
	}
}
