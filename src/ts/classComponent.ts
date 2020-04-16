import * as THREE from "three";

class Dounuts extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.TorusGeometry(120, 40, 60, 50);
    const material = new THREE.MeshNormalMaterial();
    super(geometry, material);
  }
}

class MyGroup extends THREE.Group {
  constructor() {
    super();

    const length = 10;
    for (let i = 0; i < length; i++) {
      const geometry = new THREE.SphereGeometry(30, 30, 30);
      const material = new THREE.MeshNormalMaterial();
      const mesh = new THREE.Mesh(geometry, material);

      const radian = (i / length) * Math.PI * 2;
      mesh.position.set(200 * Math.cos(radian), 30, 200 * Math.sin(radian));
      this.add(mesh);
    }
  }

  update() {
    this.rotation.x += 0.01;
    this.rotation.y += 0.02;
    requestAnimationFrame(this.update);
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
  const mesh = new Dounuts();
  scene.add(mesh);
  const group = new MyGroup();
  scene.add(group);
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(-100, 150, 500);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const tick = () => {
    mesh.rotation.x += 0.02;
    mesh.rotation.y += 0.01;

    group.update();

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  tick();
});
