import * as THREE from 'three';

let video;
export class AR{
    constructor() {

        video = document.createElement('video');
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            video.srcObject = stream;
            video.play();
        })
        video.style.position = 'absolute';
        
      }

    
      draw(width,height) {
        video.style.width = width;
        video.style.height = height;
        return video;
      }
}
