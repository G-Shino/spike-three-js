import * as THREE from "three";

type Sizing = {
  segmentHeight: number;
  segmentCount: number;
  height: number;
  halfHeight: number;
};

const createBones = (sizing: Sizing): THREE.Bone[] => {
  const bones: THREE.Bone[] = [];
  let prevBone = new THREE.Bone();
  bones.push(prevBone);
  prevBone.position.y = -sizing.halfHeight;
  for (let i = 0; i < sizing.segmentCount; i++) {
    let bone = new THREE.Bone();
    bone.position.y = sizing.segmentHeight;
    bones.push(bone);
    prevBone.add(bone);
    prevBone = bone;
  }
  return bones;
};

const createArmGeometry = (sizing: Sizing): THREE.CylinderBufferGeometry => {
  const armGeometry = new THREE.CylinderBufferGeometry(
    5,
    5,
    sizing.height,
    3,
    sizing.segmentCount * 4,
    true
  );

  const position = armGeometry.attributes.position as THREE.BufferAttribute;
  const vertex = new THREE.Vector3();
  const skinIndices = [];
  const skinWeights = [];

  for (let i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i);

    const y = vertex.y + sizing.halfHeight;

    const skinIndex = Math.floor(y / sizing.segmentHeight);
    const skinWeight = (y % sizing.segmentHeight) / sizing.segmentHeight;

    skinIndices.push(skinIndex, skinIndex + 1, 0, 0);
    skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
  }

  armGeometry.setAttribute(
    "skinIndex",
    new THREE.Uint16BufferAttribute(skinIndices, 4)
  );
  armGeometry.setAttribute(
    "skinWeight",
    new THREE.Float32BufferAttribute(skinWeights, 4)
  );
  return armGeometry;
};

window.addEventListener("DOMContentLoaded", () => {
  const renderer = new THREE.WebGLRenderer();
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const segmentHeight = 8;
  const segmentCount = 4;
  const sizing: Sizing = {
    segmentHeight,
    segmentCount,
    height: segmentCount * segmentHeight,
    halfHeight: (segmentCount * segmentHeight) / 2,
  };

  const armGeometry = createArmGeometry(sizing);
  const armMaterial = new THREE.MeshNormalMaterial({
    skinning: true,
    side: THREE.DoubleSide,
    flatShading: true,
  });
  const arm = new THREE.SkinnedMesh(armGeometry, armMaterial);
  scene.add(arm);

  const bones = createBones(sizing);
  const skelton = new THREE.Skeleton(bones);
  arm.add(bones[0]);
  arm.bind(skelton);

  const skeltonHelper = new THREE.SkeletonHelper(arm);
  scene.add(skeltonHelper);

  const camera = new THREE.PerspectiveCamera(60, width / height, 1, 100);
  camera.position.set(0, 20, -40);
  camera.lookAt(new THREE.Vector3(0, 5, 0));

  let lastTime = 0;
  const anim = (time: number) => {
    const elapsedTime = time - lastTime;
    arm.rotation.y += elapsedTime * 0.0002;
    arm.skeleton.bones[1].rotation.z = Math.sin(time * 0.001) * 0.5;
    arm.skeleton.bones[2].rotation.y = Math.sin(time * 0.002) * 1;
    arm.skeleton.bones[3].rotation.x = Math.sin(time * 0.003) * 0.5;
    renderer.render(scene, camera);
    lastTime = time;
    requestAnimationFrame(anim);
  };
  requestAnimationFrame(anim);
});
