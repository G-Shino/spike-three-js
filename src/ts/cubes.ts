import * as THREE from "three"
import Floor from "../data/floor.png"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


window.addEventListener("DOMContentLoaded", () => {
  const renderer = new THREE.WebGLRenderer();
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const floorTexture = new THREE.TextureLoader().load(Floor);
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(10, 10);
  floorTexture.magFilter = THREE.NearestFilter;

  const floorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000),
    new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.0,
      metalness: 0.6
    })
  )
  floorMesh.rotation.x = - Math.PI /2 ;
  floorMesh.receiveShadow = true;
  scene.add(floorMesh);

  const boxGeometory = new THREE.BoxGeometry(45, 45, 45)
  const boxMaterial = new THREE.MeshStandardMaterial({
    color: 0x22dd22,
    roughness: 0.1,
    metalness: 0.2,
  })
  for (let i = 0; i < 60; i++) {
    const box = new THREE.Mesh(boxGeometory, boxMaterial);
    box.position.x = Math.round((Math.random() - 0.5) * 19) * 50 + 25;
    box.position.y = 22.5;
    box.position.z = Math.round((Math.random() - 0.5) * 19) * 50 + 25;
    // 影の設定
    box.receiveShadow = true;
    box.castShadow = true;
    scene.add(box);
  }

  const spotLight = new THREE.SpotLight(
    0xffffff,
    4,
    2000,
    Math.PI / 5,
    0.2,
    1.5
  )
  spotLight.position.set(500, 300, 500);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 2048;
  scene.add(spotLight)

  const camera = new THREE.PerspectiveCamera(30, width/height)
  camera.position.set(500, 500, 500);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const controls: OrbitControls = new OrbitControls(
    camera,
    renderer.domElement
  );
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  const tick = () => {
    requestAnimationFrame(tick);
    controls.update();
    renderer.render(scene, camera)
  }
  tick();
})
