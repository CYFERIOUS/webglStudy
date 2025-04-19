precision mediump float;

varying vec3 v_position;
varying vec2 v_uv;

void main(){
    gl_FragColor = vec4(v_uv.x,1.0, 1.0, 1.0).grba;
}