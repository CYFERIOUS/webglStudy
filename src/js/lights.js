import * as THREE from 'three';

let _pointsA;
let _pointsB;
let _ambientC;
let _directional; 
let _lumen;

export class Light{
	constructor(){

		_pointsA = new THREE.PointLight( 0xffffff, 10 , 20 , 0 );
        _pointsA.power = (2 * (9*3.1416));
        _pointsA.position.set( 3000, 800, 0 );

        _pointsB = new THREE.PointLight( 0x175fe0, 10 , 20 , 0 );
        _pointsB.power = (9 * (9*3.1416));
        _pointsB.position.set( -3000, -800, 0 );


        _ambientC = new THREE.AmbientLight( 0x222222 );

        _directional = new THREE.DirectionalLight( 0x005a7c );
        
	}

	drawLights(){
		_lumen = {
			bulb1: _pointsA,
			bulb2: _pointsB,
			bulb3: _ambientC,
			bulb4: _directional
		
		};
		return _lumen;
	}
}