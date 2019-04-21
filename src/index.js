import './scss/test.scss';
import {Canvas} from './canvas.js';

const c = new Canvas();


class Container{

    constructor(radius){
        this.radius = radius;
        
    }
    draw(){
        console.log("DRAW");
     
        const bodyGuard = document.body;
        const divEst = document.createElement('div');
        //bodyGuard.appendChild(divEst);
        c.draw();
        c.animate();

       
    }
    static parse(str){
        const radius = JSON.parse(str).radius;
        return new Container(radius);
    }
    
}

//const c = new Container(1);
const contain = new Container.parse('{"radius": 1}');
document.addEventListener("DOMContentLoaded", function(event) { 
    
    contain.draw();
   
});


   