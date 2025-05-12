precision mediump float;

varying vec3 v_position;
varying vec2 v_uv;
varying float v_a_modulus;

uniform vec3 u_color;
uniform float u_time_color;
uniform vec2 u_cursor_color;

void main(){
    gl_FragColor = vec4(  u_cursor_color.x,u_cursor_color.y,1.0, 1.0);
    
    /*gl_FragColor.r = 10.0+sin(u_time_color);
    gl_FragColor.g = cos(u_time_color);
    gl_FragColor.b = -sin(u_time_color);*/
}