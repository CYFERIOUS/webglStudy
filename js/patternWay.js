

var Module = (function () {

  //for render scene
	var scene, camera, renderer;


  //for create objects
  var geometry, geometry2, material,  mesh, sphere, axis, light;
  var material2 = [];
  var teapotSize = 400;
  var tess = -1;


  var init = function (message) {
    	scene = new THREE.Scene();
        
        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 7000;
 
        geometry = new THREE.BoxGeometry( 800, 800, 800 );
        geometry2 = new THREE.SphereGeometry( 300, 10, 10 );
       

        //material = new THREE.MeshBasicMaterial( { ambient: 0x050505, color: 0x0033ff, specular: 0x555555, shininess: 30 } );
        material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture( 'images/crate.jpg' ) } );
        
        //material2.push( new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true } ));
        material2.push( new THREE.MeshLambertMaterial( { color: 0xdddddd, shading: THREE.SmoothShading } ) );
        material2.push( new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } ) );
        
        mesh = new THREE.Mesh( geometry, material );
        sphere = new THREE.Mesh( geometry2, material2 );

        axis = new THREE.AxisHelper( 500 );
        axis.position.set( 0, 0, 0 );

        light = new THREE.DirectionalLight( 0xffff00 );
        light.position.set( 0, 1, 1 ).normalize();
        
        
        
        
        sphere.position.x = 3000;
        mesh.position.x = -3000;
        //mesh.position.z = 2000;

        scene.add( mesh );
        scene.add( sphere );
        scene.add( axis );
        scene.add(light);
       

 
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
 
        document.body.appendChild( renderer.domElement );
  };

   var animate = function (message) {
   		requestAnimationFrame( animate );
 
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.02;
 
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


