import * as THREE from 'three';

let _pointsA;
let _pointsB;
let _pointsC;
let _ambientD;
let _lumen;

export class Light{
	constructor(){

		_pointsA = new THREE.PointLight( 0xffffff, 10 , 20 , 0 );
        _pointsA.power = (2 * (9*3.1416));
        _pointsA.position.set( 3000, 800, 0 );

        _pointsB = new THREE.PointLight( 0x175fe0, 10 , 20 , 0 );
        _pointsB.power = (9 * (9*3.1416));
        _pointsB.position.set( -3000, -800, 0 );

        _pointsC = new THREE.PointLight( 0x1761e4, 10 , 20 , 0 );
        _pointsC.power = (9 * (9*3.1416));
        _pointsC.position.set( 0, 0, 0 );

        _ambientD = new THREE.AmbientLight( 0x222222 );
        
	}

	drawLights(){
		_lumen = {
			bulb1: _pointsA,
			bulb2: _pointsB,
			bulb3: _pointsC,
			bulb4: _ambientD
		};
		return _lumen;
	}
}