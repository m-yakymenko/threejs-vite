import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

import { DragControls } from 'three/addons/controls/DragControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

const stats = new Stats();

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

scene.add(new THREE.GridHelper(5, 10, 0x888888, 0x444444));

export function createScene() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.domElement.appendChild(stats.dom);
}

const render = () => {
  composer.render();
}

export const addOrbitControls = () => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();

  controls.addEventListener('change', render);

  return controls
}

const onResizeHandler = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  composer.setSize(width, height);

  render()
}
window.addEventListener("resize", onResizeHandler);

export const createCube = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1,);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    stats.begin();

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    render()

    stats.end();
  }

  animate()

  return cube
}

export const createLines = () => {
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

  const points = [];
  points.push(new THREE.Vector3(- 1, 0, 0));
  points.push(new THREE.Vector3(0, 1, 0));
  points.push(new THREE.Vector3(1, 0, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  scene.add(line);
  render()
}

export const makeObjDraggable = (objects: THREE.Object3D<THREE.Object3DEventMap>[], orbitControl: OrbitControls) => {
  const controls = new DragControls(objects, camera, renderer.domElement);
  // add event listener to highlight dragged objects

  controls.addEventListener('drag', render);
  controls.addEventListener('dragstart', () => {
    orbitControl.enabled = false
  });
  controls.addEventListener('dragend', () => {
    orbitControl.enabled = true

  });
}


