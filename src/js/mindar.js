import * as THREE from 'three';

let video;
export class AR{
    constructor() {

        video = document.createElement('video');
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            video.srcObject = stream;
            video.play().then(() => {
              // Playback started successfully
          }).catch(error => {
              if (error.name === 'AbortError') {
                  console.warn('Playback aborted:', error.message);
                  // Handle the specific AbortError if necessary
              } else {
                  console.error('Playback error:', error);
              }
          });
        })
        video.style.position = 'absolute';
        
      }
      draw(width,height) {
        video.style.width = width;
        video.style.height = height;
        return video;
      }
}
