import * as THREE from "three";
import innerGlowVert from "./../shader/innerGlow.vert";
import innerGlowFrag from "./../shader/innerGlow.frag";

class InnerGlow extends THREE.Object3D {
  private sphereGeo: THREE.Geometry;
  private sphereMat: THREE.Material;
  private sphereMesh: THREE.Mesh;

  constructor(size: number) {
    super();

    const uniforms = {
      uGlowColor: { type: "c", value: new THREE.Color(0x963cff) },
      uViewVector: { type: "v3", value: new THREE.Vector3(80, 10, 80) },
    };
    this.sphereGeo = new THREE.SphereGeometry(size, 32, 32);
    this.sphereMat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: innerGlowVert,
      fragmentShader: innerGlowFrag,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    this.sphereMesh = new THREE.Mesh(this.sphereGeo, this.sphereMat);
    this.sphereMesh.position.set(0, 20, 0);
    this.add(this.sphereMesh);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const renderer = new THREE.WebGLRenderer();
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const gridHelper = new THREE.GridHelper(100, 20);
  scene.add(gridHelper);
  const axesHelper = new THREE.AxesHelper(60);
  scene.add(axesHelper);

  const innerGlow = new InnerGlow(3);
  scene.add(innerGlow);
  const innerGlow2 = new InnerGlow(20);
  scene.add(innerGlow2);

  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(80, 30, 80);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const anim = () => {
    requestAnimationFrame(anim);
    renderer.render(scene, camera);
  };
  anim();
});
