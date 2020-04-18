import * as THREE from "three";
import vertexSource from "./../shader/shader.vert";
import fragmentSource from "./../shader/shader.frag";
import { Vector2 } from "three";

window.addEventListener("DOMContentLoaded", () => {
  const renderer = new THREE.WebGLRenderer();
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const mouse = new THREE.Vector2(0.5, 0.5);
  let radius = 0.01;
  const uniforms = {
    uAspect: {
      value: width / height,
    },
    uTime: {
      value: 0.0,
    },
    uMouse: {
      value: new Vector2(0.5, 0.5),
    },
    uRadius: {
      value: radius,
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
    uniforms.uMouse.value.lerp(mouse, 0.08);
    uniforms.uRadius.value += (radius - uniforms.uRadius.value) * 0.2;
    renderer.render(scene, camera);
  };
  anim();

  renderer.domElement.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX / width;
    mouse.y = 1.0 - e.clientY / height;
  });

  renderer.domElement.addEventListener("mousedown", () => {
    radius = 0.25;
  });

  renderer.domElement.addEventListener("mouseup", () => {
    radius = 0.01;
  });
});
