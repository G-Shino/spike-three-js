import * as THREE from "three";

const div = document.createElement("div");
div.style.width = "100%";
div.style.position = "absolute";
div.style.top = "50%";
div.style.left = "50%";
div.style.transform = "translate(-25%, -15%)";
const h1 = document.createElement("h1");
h1.style.color = "white";
h1.style.fontSize = "7em";
h1.innerHTML = "THREEJS<br>TUTORIAL<br>03";

window.addEventListener("DOMContentLoaded", () => {
  document.body.style.overflow = "scroll";
  document.body.style.backgroundColor = "black";
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  div.style.height = `${2 * height}px`;

  document.body.appendChild(renderer.domElement);
  div.appendChild(h1);
  document.body.appendChild(div);

  const scene = new THREE.Scene();

  const cubeGeometry = new THREE.BoxGeometry(300, 300, 300);
  const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffff });
  const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cubeMesh.position.y = -100;
  scene.add(cubeMesh);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 2, 400, 2.0);
  pointLight.position.set(0, 0, 200);
  scene.add(pointLight);
  // const pointLightHelper = new THREE.PointLightHelper(pointLight, 20, 0xffffff);
  // scene.add(pointLightHelper);

  const fov = 60;
  const fovRad = (fov / 2) * (Math.PI / 180);
  const dist = height / 2 / Math.tan(fovRad);
  const camera = new THREE.PerspectiveCamera(fov, width / height, 1, dist * 2);
  camera.position.set(0, 0, dist);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const mouse = new THREE.Vector2(0, 0);
  renderer.domElement.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX - width / 2;
    mouse.y = -(e.clientY - height / 2);
  });

  let scroll = 0;
  window.addEventListener("scroll", () => {
    scroll = window.scrollY;
  });

  const anim = () => {
    requestAnimationFrame(anim);
    pointLight.position.x = mouse.x;
    pointLight.position.y = mouse.y;
    cubeMesh.rotation.x += 0.01;
    cubeMesh.rotation.y += 0.01;
    cubeMesh.position.y = scroll;
    renderer.render(scene, camera);
  };
  anim();
});
