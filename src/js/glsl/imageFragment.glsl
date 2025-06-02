precision mediump float;

uniform sampler2D u_texture;
varying vec2 v_uv;

void main(){
    vec3 color_texture = texture2D(u_texture,v_uv).rgb;
    gl_FragColor = vec4( color_texture, 1.0);
    
 
}