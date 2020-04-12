import * as THREE from "three";

window.addEventListener("DOMContentLoaded", () => {
  const renderer = new THREE.WebGLRenderer();
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2000, 0.1, 2000),
    new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
  );
  meshFloor.receiveShadow = true;
  scene.add(meshFloor);

  const meshKnot = new THREE.Mesh(
    new THREE.TorusKnotBufferGeometry(3, 1, 100, 16),
    new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.0 })
  );
  meshKnot.position.set(0, 5, 0);
  meshKnot.castShadow = true;
  scene.add(meshKnot);

  const light = new THREE.SpotLight(0xffffff, 2, 100, Math.PI / 4, 1);
  light.castShadow = true;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  scene.add(light);

  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(10, 20, 20);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const tick = () => {
    requestAnimationFrame(tick);

    const t = Date.now() / 500;
    const r = 20.0;
    const lx = r * Math.cos(t);
    const lz = r * Math.sin(t);
    const ly = 20.0 + 5.0 * Math.sin(t / 3.0);
    light.position.set(lx, ly, lz);
    renderer.render(scene, camera);
  };

  tick();
});
