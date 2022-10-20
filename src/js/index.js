import '../scss/test.scss';
import {Canvas} from './canvas.js';

const c = new Canvas();


class Container{
    constructor(){
        c.draw();
        c.addMouseHandler();
        c.animate();
    }

}


document.addEventListener("DOMContentLoaded", function(event) {
    const contain = new Container();
    document.body.style.overflow = 'hidden';
});
