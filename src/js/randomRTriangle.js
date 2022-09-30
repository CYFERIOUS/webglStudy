import * as THREE from 'three';
import {Materials} from './materials.js';

let _geoRandom;
let _randomMesh;
let _size = new Array(125,250,500,1000,2000);
let _pile = new Array();
let fragments = [];
let ADD = 0.05;
const dt = 0.02;
const basic_material = new Materials(7);

class Fragment {

    constructor(position, velocity, g) {
        this.velocity = velocity;
        this.velocity.multiplyScalar(dt);
        this.shape = new THREE.Mesh(g, basic_material);
        this.shape.position.copy(position);
    }

   move() {
        this.shape.position.add(this.velocity);
        this.shape.rotation.x += ADD;
    }
};

class CreateTriangle{
    constructor(p1, p2, p3){
        let geometry = new THREE.BufferGeometry();
        const points = [];
        points.push(p1, p2, p3)
        geometry.setFromPoints(points);
        geometry.computeVertexNormals();
        return geometry;
    }
};
export class RandomTriangle{

    constructor(A,B,C) {

        let p1 = new THREE.Vector3(0, B, 0);
        let p2 = new THREE.Vector3(A, 0, C);
        let p3 = new THREE.Vector3(-A, 0, C);

        let p4 = new THREE.Vector3(-A, 0, -C);
        let p5 = new THREE.Vector3(A, 0, -C);
        let p6 = new THREE.Vector3(0, -B, 0);

        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(0, 0, 6), new CreateTriangle(p1, p2, p3)));
        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(-2, 4, 0), new CreateTriangle(p1, p3, p4)));
        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(0, 5, -4), new CreateTriangle(p1, p4, p5)));
        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(2, 3, 0), new CreateTriangle(p1, p5, p2)));
        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(0, -5, 3), new CreateTriangle(p3, p2, p6)));
        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(-4, -3, 0), new CreateTriangle(p6, p3, p4)));
        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(0, -4, -4), new CreateTriangle(p6, p4, p5)));
        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(3, -3, 0), new CreateTriangle(p6, p2, p5)));
        fragments.forEach(f => _pile.push(f.shape));


    }

    createMatrix(){
         for(let i of _size){
            this.constructor(i,i,i);
          }
    }
    move(){
      fragments.forEach(f => f.move());
    }

    draw() {
        this.createMatrix();
        return _pile;
    }
}
