precision mediump float;

varying vec3 v_position;
varying vec2 v_uv;
varying float v_a_modulus;

uniform vec3 u_color;
uniform float u_time_color;
uniform vec2 u_cursor_color;

void main(){

    vec3 mixing = mix(vec3(0.0,1.0,0.0), vec3(0.0,0.0,1.0), v_uv.x);
    gl_FragColor = vec4(mixing,1.0);
}