import * as THREE from "three";

window.addEventListener("DOMContentLoaded", () => {
  const renderer = new THREE.WebGLRenderer();
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const geometory = new THREE.BoxGeometry(30, 30, 30);

  const meshList: THREE.Mesh[] = [];
  for (let i = 0; i < 200; i++) {
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

    const mesh = new THREE.Mesh(geometory, material);
    mesh.position.x = (Math.random() - 0.5) * 800;
    mesh.position.y = (Math.random() - 0.5) * 800;
    mesh.position.z = (Math.random() - 0.5) * 800;
    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;
    mesh.rotation.z = Math.random() * 2 * Math.PI;
    scene.add(mesh);

    meshList.push(mesh);
  }

  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, 1000);

  const mouse = new THREE.Vector2();

  renderer.domElement.addEventListener("mousemove", (event) => {
    const element = event.currentTarget as HTMLCanvasElement;

    const x = event.clientX - element.offsetLeft;
    const y = event.clientY - element.offsetTop;
    const w = element.offsetWidth;
    const h = element.offsetHeight;

    mouse.x = (x / w) * 2 - 1;
    mouse.y = -(y / h) * 2 + 1;
  });

  const raycast = new THREE.Raycaster();
  const tick = () => {
    raycast.setFromCamera(mouse, camera);

    const intersects = raycast.intersectObjects(meshList);

    meshList.map((mesh) => {
      const material = mesh.material as THREE.MeshStandardMaterial;
      if (intersects.length > 0 && mesh === intersects[0].object) {
        material.color.setHex(0xff0000);
      } else {
        material.color.setHex(0xffffff);
      }
    });
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };
  tick();
});
