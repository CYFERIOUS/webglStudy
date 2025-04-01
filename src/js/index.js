import '../scss/test.scss';
import {Canvas} from './canvas.js';

const c = new Canvas();

const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}

class Container{
    constructor(){
        c.draw(aspect.width,aspect.height);
        c.addMouseHandler();
        c.animate();
    }

}


window.addEventListener("resize",()=>{
    aspect.width = window.innerWidth;
    aspect.height = window.innerHeight;
    c.draw(aspect.width,aspect.height);
    

})

document.addEventListener("DOMContentLoaded", function(event) {
    const contain = new Container();
    document.body.style.overflow = 'hidden';

});
