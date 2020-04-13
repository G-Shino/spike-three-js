import * as THREE from "three";

window.addEventListener("DOMContentLoaded", () => {
  const renderer = new THREE.WebGLRenderer();
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.add(new THREE.GridHelper(600, 10));
  scene.add(new THREE.AxesHelper(200));

  const sphereGroup = new THREE.Group();
  let targetMesh = new THREE.Mesh();
  for (let i = 0; i < 10; i++) {
    const geometory = new THREE.SphereGeometry(30, 30, 30);
    const material =
      i === 0
        ? new THREE.MeshNormalMaterial()
        : new THREE.MeshBasicMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(geometory, material);
    const radian = (i / 10) * 2 * Math.PI;
    mesh.position.set(200 * Math.cos(radian), 0, 200 * Math.sin(radian));
    sphereGroup.add(mesh);

    if (i === 0) {
      targetMesh = mesh;
    }
  }
  scene.add(sphereGroup);

  const lineGeometory = new THREE.Geometry();
  lineGeometory.vertices = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 0),
  ];
  const lineMesh = new THREE.Line(lineGeometory, new THREE.LineBasicMaterial());
  scene.add(lineMesh);

  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(300, 300, 300);
  camera.lookAt(0, 0, 0);

  const tick = () => {
    requestAnimationFrame(tick);
    sphereGroup.rotation.x += 0.01;
    sphereGroup.rotation.y += 0.01;

    targetMesh.getWorldPosition(lineGeometory.vertices[0]);
    lineGeometory.verticesNeedUpdate = true;

    renderer.render(scene, camera);
  };
  tick();
});
