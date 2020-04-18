varying vec2 vUv;
uniform float uAspect;// 画面のアスペクト比
uniform float uTime;

void main() {
  vec2 uv = vec2( vUv.x * uAspect, vUv.y );
  vec2 center = vec2( .5 * uAspect, .5 );// 画面の中心
  float radius = 0.05 + sin(uTime * 2.0) * 0.025;
  float lightness = radius / length( uv - center );
  vec4 color = vec4(vec3(lightness), 1.0);
  color *= vec4(0.2, 1.0, 0.5, 1.0);
  gl_FragColor = color;
}
