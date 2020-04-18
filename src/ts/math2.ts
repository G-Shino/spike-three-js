import * as THREE from "three";

class Course extends THREE.Object3D {
  private points: THREE.Vector3[];

  public get getPoints() {
    return this.points;
  }

  public constructor() {
    super();
    this.points = [];
    let radius = 5;
    for (let index = 0; index < 362; index++) {
      let rad = (index * Math.PI) / 180;
      let sin = Math.sin(rad * 3);

      let x = radius * Math.cos(rad) * 2 + sin * 2;
      let y = radius * Math.sin(rad) + sin * 3;
      this.points.push(new THREE.Vector3(x, y, 0));
    }

    const material = new THREE.LineBasicMaterial({
      color: 0xff0000,
    });

    const geometry = new THREE.Geometry();
    geometry.vertices = this.points;

    const line = new THREE.Line(geometry, material);
    this.add(line);
  }
}

class Truck extends THREE.Object3D {
  public constructor() {
    super();

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 6),
      new THREE.MeshPhongMaterial({
        color: 0xcccccc,
      })
    );
    body.position.y = 3;
    this.add(body);

    const wheel1 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(1, 1, 4, 10),
      new THREE.MeshPhongMaterial({
        color: 0xffff00,
      })
    );
    wheel1.rotation.x = wheel1.rotation.z = (90 * Math.PI) / 180;
    wheel1.position.y = 1;
    wheel1.position.z = -2;
    this.add(wheel1);

    const wheel2 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(1, 1, 4, 10),
      new THREE.MeshPhongMaterial({
        color: 0xffff00,
      })
    );
    wheel2.rotation.x = wheel2.rotation.z = (90 * Math.PI) / 180;
    wheel2.position.y = 1;
    wheel2.position.z = 2;
    this.add(wheel2);
  }

  update() {}
}

function getNormal(
  currentPoint: THREE.Vector3,
  nextPoint: THREE.Vector3
): THREE.Vector3 {
  let vAB = nextPoint.clone().sub(currentPoint).normalize();
  let vAZ = new THREE.Vector3(0, 0, 1);
  let normalVec = vAB.cross(vAZ);
  return normalVec;
}
window.addEventListener("DOMContentLoaded", () => {
  const renderer = new THREE.WebGLRenderer();
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const gridHelper = new THREE.GridHelper(50, 10);
  gridHelper.position.y = -10;
  scene.add(gridHelper);

  const course = new Course();
  scene.add(course);

  const truck = new Truck();
  truck.scale.multiplyScalar(0.5);
  truck.position.copy(course.getPoints[0]);
  scene.add(truck);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(directionalLight);

  const camera = new THREE.PerspectiveCamera(45, width / height, 10, 500);
  camera.position.set(10, 10, 30);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  let frame = 0;
  const anim = () => {
    frame++;
    if (frame > 360) {
      frame = 0;
    }

    const normal = getNormal(
      course.getPoints[frame],
      course.getPoints[frame + 1]
    );

    truck.position.copy(course.getPoints[frame]);
    // truck.up.set(0, 0, 1);
    truck.up.set(normal.x, normal.y, normal.z);
    truck.lookAt(course.getPoints[frame + 1]);
    requestAnimationFrame(anim);
    renderer.render(scene, camera);
  };
  anim();
});
