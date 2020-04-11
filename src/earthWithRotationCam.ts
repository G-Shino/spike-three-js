import * as THREE from "three";
import Earth from "./data/earthmap1k.jpg";

window.addEventListener("DOMContentLoaded", () => {
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  const width: number = window.innerWidth;
  const height: number = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  const scene: THREE.Scene = new THREE.Scene();

  const geometory_earth: THREE.SphereGeometry = new THREE.SphereGeometry(
    300,
    30,
    30
  );
  const material_earth: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial(
    {
      map: new THREE.TextureLoader().load(Earth),
      side: THREE.DoubleSide
    }
  );
  const mesh_earth: THREE.Mesh = new THREE.Mesh(
    geometory_earth,
    material_earth
  );
  scene.add(mesh_earth);

  const createStarField = (): void => {
    const geometory_stars: THREE.Geometry = new THREE.Geometry();
    for (let i = 0; i < 1000; i++) {
      geometory_stars.vertices.push(
        new THREE.Vector3(
          3000 * (Math.random() - 0.5),
          3000 * (Math.random() - 0.5),
          3000 * (Math.random() - 0.5)
        )
      );
    }
    const material_stars: THREE.Material = new THREE.PointsMaterial({
      size: 5,
      color: 0xffffff
    });
    const mesh_stars: THREE.Points = new THREE.Points(
      geometory_stars,
      material_stars
    );
    scene.add(mesh_stars);
  };
  createStarField();

  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    45,
    width / height
  );
  camera.position.set(0, 0, 1000);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  let rot = 0;
  let mouseX = 0;
  document.addEventListener("mousemove", event => {
    mouseX = event.pageX;
  });
  const tick = (): void => {
    requestAnimationFrame(tick);
    const targetRot = -(mouseX / width) * 360;
    rot += (targetRot - rot) * 0.02;
    const radian = (rot * Math.PI) / 180;
    camera.position.x = 1000 * Math.sin(radian);
    camera.position.z = 1000 * Math.cos(radian);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    renderer.render(scene, camera);
  };
  tick();
});
