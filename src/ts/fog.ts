import * as THREE from "three";

addEventListener("DOMContentLoaded", () => {
  const renderer = new THREE.WebGLRenderer();
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // フォグを設定
  scene.fog = new THREE.Fog(0x0000ff, 50, 2000);
  // scene.add(new THREE.GridHelper(600, 10));
  // scene.add(new THREE.AxesHelper(500));

  const group = new THREE.Group();
  const geometry = new THREE.BoxBufferGeometry(50, 50, 50);
  const material = new THREE.MeshStandardMaterial();

  for (let i = 0; i < 700; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 1500;
    mesh.position.y = (Math.random() - 0.5) * 1500;
    mesh.position.z = (Math.random() - 0.5) * 1500;
    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;
    mesh.rotation.z = Math.random() * 2 * Math.PI;
    // グループに格納する
    group.add(mesh);
  }
  scene.add(group);

  scene.add(new THREE.DirectionalLight(0xff0000, 3)); // 平行光源
  scene.add(new THREE.AmbientLight(0x00ffff)); // 環境光源

  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 500, 1000);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const tick = () => {
    requestAnimationFrame(tick);
    group.rotateY(0.01);
    renderer.render(scene, camera);
  };
  tick();
});
