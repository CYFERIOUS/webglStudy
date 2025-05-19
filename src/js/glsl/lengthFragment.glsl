precision mediump float;

varying vec3 v_position;
varying vec2 v_uv;

void main(){

    gl_FragColor = vec4(1.0,1.0,1.0, 1.0);

    float vector_length = length(vec2(0.4,0.3));

    gl_FragColor.r = vector_length;
    
}