import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import ReadyToFly from "./../data/readyToFly.obj";

window.addEventListener("DOMContentLoaded", () => {
  console.log("ReadyToFloy:");
  console.log(ReadyToFly);
  const renderer = new THREE.WebGLRenderer();
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // scene.add(new THREE.AxesHelper(100));

  const loader = new OBJLoader();
  loader.load(ReadyToFly, (obj) => {
    obj.position.set(0, -60, 50);
    scene.add(obj);
  });

  const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
  directionalLight.position.set(100, 1000, 100);
  scene.add(directionalLight); // 平行光源
  // const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
  // scene.add(lightHelper);
  scene.add(new THREE.AmbientLight(0xffffff, 0.2)); // 環境光源

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
  camera.position.set(-200, 150, 200);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  const tick = () => {
    controls.update();
    // lightHelper.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };
  tick();
});
