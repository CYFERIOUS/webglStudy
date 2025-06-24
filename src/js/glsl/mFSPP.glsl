precision mediump float;
uniform sampler2D tDiffuse;
varying vec2 v_uv;
void main(){
    vec4 bg_color = texture2D(tDiffuse, v_uv);
    bg_color.g += 0.5;
    gl_FragColor = bg_color;
    
    
}