uniform vec3 uViewVector;
varying float vOpacity;

void main(){
  vec3 nNormal = normalize(normal);
  vec3 nViewVec = normalize(uViewVector);

  vOpacity = dot(nNormal, nViewVec);
  vOpacity = 1.0 - vOpacity;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
