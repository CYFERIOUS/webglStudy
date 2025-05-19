precision mediump float;

varying vec3 v_position;
varying vec2 v_uv;

void main(){
    float distancia = distance(v_uv,vec2(0.5));
    gl_FragColor = vec4(distancia, distancia, distancia, 1.0);
}