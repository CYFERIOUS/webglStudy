import * as THREE from 'three';
import {Materials} from './materials.js';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';


let _size = new Array(200,400,600,800,1000,1200,1400,1600,1800,2000,2200,2400,2600,2800,3000);
let _geometry;
let _material;
let _sphereGeometry;
let _sphereMaterial;
let _sampler;
let _spheres;
let _shape;
const group = new THREE.Group();
let _pile = new Array();



export class Particles {

    constructor(currentGeometry) {

        _sampler = new MeshSurfaceSampler(currentGeometry).build();

        const vertices = [];
        // Create a dummy Vector to store the sampled coordinates
        const tempPosition = new THREE.Vector3();
        // Loop to sample a coordinate for each points
        for (let i = 0; i < 150000; i ++) {
          // Sample a random position in the torus
          _sampler.sample(tempPosition);
          // Push the coordinates of the sampled coordinates into the array
          vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
        }
        let color = new THREE.Color( 0xffffff );
        color.setHex( Math.random() * 0xffffff );
        // Create a geometry for the points
        const pointsGeometry = new THREE.BufferGeometry();
        // Define all points positions from the previously created array
        pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        // Define the matrial of the points
        const pointsMaterial = new THREE.PointsMaterial({
          color: color,
          size: 0.03
        });
        // Create an instance of points based on the geometry & material
        const points = new THREE.Points(pointsGeometry, pointsMaterial);
        // Add them into the main group

        group.add(points);
        return group;
          
    }
} 
