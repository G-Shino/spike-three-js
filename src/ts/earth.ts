import * as THREE from "three";
import Earth from "./../data/earthmap1k.jpg";

window.addEventListener("DOMContentLoaded", () => {
  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer();
  // レンダラーのサイズを設定
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  // canvasをbodyに追加
  document.body.appendChild(renderer.domElement);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera_aspect = width / height;
  const camera = new THREE.PerspectiveCamera(45, camera_aspect, 1, 10000);
  camera.position.set(0, 0, 1000);

  // 箱を作成
  const geometry_box = new THREE.BoxGeometry(50, 50, 50);
  const material_box = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  const mesh_box = new THREE.Mesh(geometry_box, material_box);
  mesh_box.position.y = 300;
  mesh_box.position.x = 300;
  scene.add(mesh_box);

  // 地球を作成
  // 球体を作成
  const geometry_earth = new THREE.SphereGeometry(300, 30, 30);
  // 画像を読み込む
  const loader_earth = new THREE.TextureLoader();
  const texture_earth = loader_earth.load(Earth);
  // マテリアルにテクスチャーを設定
  const material_earth = new THREE.MeshStandardMaterial({
    map: texture_earth
  });
  // メッシュを作成
  const mesh_earth = new THREE.Mesh(geometry_earth, material_earth);
  mesh_earth.rotation.y += 1;
  // 3D空間にメッシュを追加
  scene.add(mesh_earth);

  // 平行光源を生成
  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  scene.add(light);

  const tick = (): void => {
    requestAnimationFrame(tick);

    mesh_box.rotation.y += 0.01;
    mesh_earth.rotation.y += 0.01;

    // 描画
    renderer.render(scene, camera);
  };
  tick();

  console.log("Hello Three.js");
});
