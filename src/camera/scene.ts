import * as THREE from 'three'
import { camera, renderer, scene, stats } from '../singleton'


export function createScene() {
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  renderer.domElement.appendChild(stats.dom)

  window.addEventListener("resize", () => {
    const width = window.innerWidth
    const height = window.innerHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
  })
}

export const addLight = () => {
  scene.add(new THREE.AmbientLight(0xf0f0f0, 3));
  const light = new THREE.SpotLight(0xffffff, 4.5);
  light.position.set(0, 1000, -200);
  light.angle = Math.PI * 0.01;
  light.decay = 0;
  light.castShadow = true;
  light.shadow.camera.near = 200;
  light.shadow.camera.far = 2000;
  light.shadow.bias = - 0.000222;
  light.shadow.mapSize.width = 10000;
  light.shadow.mapSize.height = 10000;
  scene.add(light);
}

export const getNewRenderer = () => {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  return renderer
}

export const addPlane = () => {
  const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
  planeGeometry.rotateX(- Math.PI / 2);
  const planeMaterial = new THREE.ShadowMaterial({ color: 'grey', opacity: 0.5 });

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.y = 0;
  plane.receiveShadow = true;
  scene.add(plane);
}
