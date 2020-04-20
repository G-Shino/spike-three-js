uniform vec3 uGlowColor;
varying float vOpacity;

void main(){
    gl_FragColor = vec4(uGlowColor, vOpacity);
}
