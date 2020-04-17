import * as THREE from "three";
import ParticleImage from "./../data/particle.png";

const PARTICKLE_NUM = 3000;
const COLOR_LIST = [0xffff00, 0xffffdd, 0xffffff];
const RADIUS = 50;

class ParticleEmitter extends THREE.Object3D {
  private particleStore: THREE.Sprite[] = [];
  private texture: THREE.Texture;

  public constructor() {
    super();

    const loader = new THREE.TextureLoader();
    this.texture = loader.load(ParticleImage);

    for (let index = 0; index < PARTICKLE_NUM; index++) {
      const particle = this.createParticle();
      this.add(particle);
      this.particleStore.push(particle);
    }
  }
  private createParticle() {
    const rand = Math.floor(Math.random() * 3);
    const color = COLOR_LIST[rand];

    const material = new THREE.SpriteMaterial({
      color: color,
      map: this.texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.3,
    });

    const sprite = new THREE.Sprite(material);

    const phi = ((Math.random() * 180 - 90) * Math.PI) / 180;
    const theta = (Math.random() * 360 * Math.PI) / 180;
    const radius = RADIUS;
    sprite.position.x = radius * Math.cos(phi) * Math.cos(theta) * -1;
    sprite.position.y = radius * Math.sin(phi);
    sprite.position.z = radius * Math.cos(phi) * Math.sin(theta);

    sprite.scale.multiplyScalar(Math.random() * 5 + 1);

    return sprite;
  }

  public update(lightFrontVector: THREE.Vector3, aperture: number) {
    const target = lightFrontVector.clone();
    this.particleStore.map((particle) => {
      const val = particle.position.clone().normalize().dot(target);
      let opacity = (val - (1 - aperture)) / aperture;
      opacity *= Math.random();
      particle.material.opacity = opacity;
    });
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
  // scene.add(new THREE.AxesHelper(40));

  const particles = new ParticleEmitter();
  scene.add(particles);

  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
  const cubeGeometory = new THREE.BoxGeometry(5, 5, 5);
  const cubeMesh = new THREE.Mesh(cubeGeometory, cubeMaterial);
  scene.add(cubeMesh);

  const light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);

  const camera = new THREE.PerspectiveCamera(45, width / height, 10, 500);
  camera.position.set(70, 30, 100);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const anim = () => {
    renderer.render(scene, camera);
    cubeMesh.rotation.y += 0.03;
    // cubeMesh.rotation.x += 0.02;
    const x = Math.sin(cubeMesh.rotation.y);
    const z = Math.cos(cubeMesh.rotation.y);
    particles.update(new THREE.Vector3(x, 0, z), 0.2);
    console.log(z);
    requestAnimationFrame(anim);
  };
  anim();
});
