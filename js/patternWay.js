

var Module = (function () {

  //for render scene
	var scene, camera, renderer;


  //for create objects
  var geometry, material, mesh;



  var init = function (message) {
    	scene = new THREE.Scene();
        
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 2000;
 
        geometry = new THREE.BoxGeometry( 800, 800, 800 );
        material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
 
        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );
 
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
 
        document.body.appendChild( renderer.domElement );
  };

   var animate = function (message) {
   		requestAnimationFrame( animate );
 
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
 
        renderer.render( scene, camera );
   }


   var publicMethod = function () {
    if (Detector.webgl) {
    init();
    animate();
    } else {
      alert("no canciona");
    }  
  };
  
  
  return {
    publicMethod: publicMethod
  };

})();

$(function() {

  Module.publicMethod();
});


