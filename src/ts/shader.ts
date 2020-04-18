import * as THREE from "three";
import vertexSource from "./../shader/shader.vert";
import fragmentSource from "./../shader/shader.frag";

window.addEventListener("DOMContentLoaded", () => {
  const renderer = new THREE.WebGLRenderer();
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const uniforms = {
    uAspect: {
      value: width / height,
    },
    uTime: {
      value: 0.0,
    },
  };
  const planeGeo = new THREE.PlaneGeometry(2, 2, 10, 10);
  const planeMat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vertexSource,
    fragmentShader: fragmentSource,
    wireframe: false,
  });
  // const planeMat = new THREE.MeshNormalMaterial();
  const planeMesh = new THREE.Mesh(planeGeo, planeMat);
  scene.add(planeMesh);

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1);

  const anim = () => {
    requestAnimationFrame(anim);
    uniforms.uTime.value += 0.01;
    renderer.render(scene, camera);
  };
  anim();
});
