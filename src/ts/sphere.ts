import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import ParticleImage from "./../data/particle.png";

class MainSphere extends THREE.Object3D {
  private sphereGeo: THREE.Geometry;
  private sphereMat: THREE.Material;
  private sphereObj: THREE.Mesh;
  private particleObj: ParticleEmitter;
  private radian: number = 0;
  public sphereSpeed: number = 8;
  public targetVec: THREE.Vector3 = new THREE.Vector3(0, 15, 0);

  public constructor() {
    super();
    this.sphereGeo = new THREE.SphereGeometry(1, 24, 24);
    this.sphereMat = new THREE.MeshStandardMaterial({
      color: 0xf4a460,
      roughness: 1.0,
      metalness: 0.0,
    });
    this.sphereObj = new THREE.Mesh(this.sphereGeo, this.sphereMat);
    this.sphereObj.receiveShadow = true;
    this.sphereObj.castShadow = true;
    this.particleObj = new ParticleEmitter();
    this.add(this.sphereObj);
    this.add(this.particleObj);
    this.update();
    this.position.y = 15;
  }

  public update() {
    const shiftX =
      (this.targetVec.x * this.sphereSpeed - this.position.x) * 0.01;
    const shiftZ =
      (this.targetVec.z * this.sphereSpeed - this.position.z) * 0.01;
    this.particleObj.update(shiftX, shiftZ);
    this.position.x += shiftX;
    this.position.z += shiftZ;
    this.radian += Math.PI / 100;
    this.position.y = 3 * Math.sin(this.radian) + 15;
  }

  public stop() {
    this.targetVec.copy(this.position.clone().divideScalar(this.sphereSpeed));
  }
}

class ParticleEmitter extends THREE.Object3D {
  public constructor() {
    super();
  }

  public update(shiftX: number, shiftZ: number) {
    const particle = new OneParticle();
    this.add(particle);
    this.children.map((particle: OneParticle) => {
      particle.position.y += particle.speed;
      particle.position.x -= shiftX;
      particle.position.z -= shiftZ;
      particle.material.opacity -= 0.01;
      if (particle.life >= 50) {
        this.remove(particle);
      } else {
        particle.life += 1;
      }
    });
  }
}

class OneParticle extends THREE.Sprite {
  private RADIUS: number = 2;
  private COLOR_LIST: number[] = [0xffff00, 0xffffdd, 0xffffff];
  public speed: number;
  public life: number = 0;
  private texture: THREE.Texture;

  public constructor() {
    super();
    const loader = new THREE.TextureLoader();
    this.texture = loader.load(ParticleImage);
    this.createParticle();
  }

  private createParticle(): void {
    const rand = Math.floor(Math.random() * 3);
    const color = this.COLOR_LIST[rand];
    this.speed = Math.random() * 0.4;

    const material = new THREE.SpriteMaterial({
      color: color,
      map: this.texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.5,
    });

    this.material = material;
    const phi = ((Math.random() * 180 - 90) * Math.PI) / 180;
    const theta = (Math.random() * 360 * Math.PI) / 180;
    this.position.x = this.RADIUS * Math.cos(phi) * Math.cos(theta) * -1;
    this.position.y = this.RADIUS * Math.sin(phi);
    this.position.z = this.RADIUS * Math.cos(phi) * Math.sin(theta);

    this.scale.multiplyScalar(Math.random() * 5 + 1);
  }
}

class MainCamera extends THREE.PerspectiveCamera {
  private static instance: MainCamera;
  public static getInstance(
    width: number,
    height: number,
    dom: HTMLElement
  ): MainCamera {
    return MainCamera.instance || new MainCamera(width, height, dom);
  }

  public controls: OrbitControls;
  public constructor(width: number, height: number, dom: HTMLElement) {
    super(45, width / height, 1, 1000);
    this.position.set(50, 50, 50);
    this.lookAt(0, 0, 0);
    MainCamera.instance = this;

    this.controls = new OrbitControls(this, dom);
    this.controls.enableKeys = false;
    this.controls.maxDistance = 75;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
  }

  public update(targetPosition: THREE.Vector3) {
    this.position.y = 35;
    this.controls.target.setX(targetPosition.x);
    this.controls.target.setY(15);
    this.controls.target.setZ(targetPosition.z);
    this.controls.update();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const renderer = new THREE.WebGLRenderer();
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // const gridHelper = new THREE.GridHelper(1000, 100);
  // scene.add(gridHelper);
  // const axesHelper = new THREE.AxesHelper(60);
  // scene.add(axesHelper);

  const floorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000),
    new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness: 0.0,
      metalness: 0.6,
    })
  );
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.receiveShadow = true;
  scene.add(floorMesh);

  const mainSphere = new MainSphere();
  scene.add(mainSphere);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(
    0xffffff,
    3,
    1000,
    Math.PI / 3,
    0.2,
    1.5
  );
  spotLight.position.set(0, 300, 0);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 2048;
  scene.add(spotLight);

  const mainCamera = new MainCamera(width, height, renderer.domElement);
  scene.add(mainCamera);

  let cameraToSphereVec = new THREE.Vector3(0, 0, 0);
  const anim = () => {
    cameraToSphereVec = mainSphere.position
      .clone()
      .sub(mainCamera.position)
      .normalize();

    mainSphere.update();
    mainCamera.update(mainSphere.position);
    renderer.render(scene, mainCamera);
    requestAnimationFrame(anim);
  };
  anim();

  window.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
      case 37:
        mainSphere.targetVec.add(
          new THREE.Vector3(
            cameraToSphereVec.z,
            mainSphere.position.y,
            -cameraToSphereVec.x
          )
        );
        break;
      case 38:
        mainSphere.targetVec.add(
          new THREE.Vector3(
            cameraToSphereVec.x,
            mainSphere.position.y,
            cameraToSphereVec.z
          )
        );
        break;
      case 39:
        mainSphere.targetVec.add(
          new THREE.Vector3(
            -cameraToSphereVec.z,
            mainSphere.position.y,
            cameraToSphereVec.x
          )
        );
        break;
      case 40:
        mainSphere.targetVec.add(
          new THREE.Vector3(
            -cameraToSphereVec.x,
            mainSphere.position.y,
            -cameraToSphereVec.z
          )
        );
        break;
      case 32:
        mainSphere.stop();
        break;
    }
  });
});
