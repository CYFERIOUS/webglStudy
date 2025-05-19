precision mediump float;

varying vec3 v_position;
varying vec2 v_uv;

void main(){

    

    vec3 color = vec3(1.0,1.0,1.0);
    float modulus = mod(v_uv.y*5.0,1.0);


    gl_FragColor = vec4(modulus,modulus,modulus, 1.0);
    
}