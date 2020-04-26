import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import DogGltf from "./../data/dog.gltf";

window.addEventListener("DOMContentLoaded", () => {
  const renderer = new THREE.WebGLRenderer();
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const gridHelper = new THREE.GridHelper(600, 10);
  scene.add(gridHelper);

  let mixer = new THREE.AnimationMixer(new THREE.Object3D());
  let dog = new THREE.Object3D();
  let animations: THREE.AnimationClip[] = [];
  const loader = new GLTFLoader();
  loader.load(DogGltf, (gltf) => {
    dog = gltf.scene;
    dog.position.y += 6;
    animations = gltf.animations;
    if (animations && animations.length) {
      mixer = new THREE.AnimationMixer(dog);
    }
    scene.add(dog);
  });

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(50, 50, 50);
  scene.add(directionalLight);

  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, 100);
  const controls: OrbitControls = new OrbitControls(
    camera,
    renderer.domElement
  );
  controls.enableKeys = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  const clock = new THREE.Clock();
  let targetZ = 0;
  const tick = () => {
    requestAnimationFrame(tick);
    dog.position.z += (dog.position.z - targetZ) * -0.1;
    if (mixer) {
      mixer.update(clock.getDelta());
    }
    controls.update();
    renderer.render(scene, camera);
  };
  tick();

  window.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
      case 38:
        targetZ += 1;
        if (animations && animations.length) {
          const action = mixer.clipAction(animations[0]);
          action.play();
        }
        break;
      case 40:
        mixer.setTime(0);
        targetZ -= 1;
        break;
    }
  });

  window.addEventListener("keyup", (event) => {
    mixer.stopAllAction();
  });
});
