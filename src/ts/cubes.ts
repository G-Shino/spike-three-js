import * as THREE from "three"
import Floor from "../data/floor.png"

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
  camera.position.set(250, 250, 250);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const tick = () => {
    requestAnimationFrame(tick);
    renderer.render(scene, camera)
  }
  tick();
})
