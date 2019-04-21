import * as THREE from 'three';

let _pointsA;
let _pointsB;

export class Lights{
	constructor(){
		_pointsA = new THREE.PointLight( 0xffffff, 10 , 20 , 0 );
        _pointsA.power = (2 * (9*3.1416));
        _pointsA.position.set( 3000, 800, 0 );

        _pointsB = new THREE.PointLight( 0x175fe0, 10 , 20 , 0 );
        _pointsB.power = (9 * (9*3.1416));
        _pointsB.position.set( -3000, -800, 0 );
	}

	pointLighting(){

	}
}