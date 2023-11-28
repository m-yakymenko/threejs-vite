import * as THREE from 'three'
import { camera, dotsGroup, linesGroup } from '../singleton'
import { setupCameraForPoints } from '../camera/cameraHelpers'
import { addLineHelper } from './dotsConnector'
import { randomIntFromInterval } from '../utils'
import { COLOR } from '../constans'

const colors = new Float32Array([
  1.0, 0.0, 0.0,  // red (normalized)
  0.0, 1.0, 0.0   // green (normalized)
]);

export const createLines = (points: THREE.Vector3[]) => {
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  lineGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const lineMaterial = new THREE.LineBasicMaterial({
    //color: COLOR.LINE,
    linewidth: 5, // in pixels
    vertexColors: true,
  })
  const line = new THREE.Line(lineGeometry, lineMaterial)
  line.castShadow = true
  linesGroup.add(line)
  return line
}

export const createDot = (position?: THREE.Vector3) => {
  const dotGeometry = new THREE.SphereGeometry(0.1);
  const dotMaterial = new THREE.MeshStandardMaterial({ color: COLOR.DOT, });
  const sphere = new THREE.Mesh(dotGeometry, dotMaterial);
  sphere.position.copy(position || new THREE.Vector3().copy(camera.position).setZ(0));
  sphere.castShadow = true
  sphere.receiveShadow = true;
  dotsGroup.add(sphere)
  return sphere;
}

export const createBasicDots = () => {
  const data = Array(20).fill([0, 0, 0]).map(() => [Math.random() * 10, Math.random() * 8 + 2, Math.random() * 10])
  data.forEach(coord => createDot(new THREE.Vector3(...coord)))

  const vectors = data.map(coord => new THREE.Vector3(...coord))
  setupCameraForPoints(vectors)
  createBasicLines()
}

export const createBasicLines = () => {
  const dots = dotsGroup.children

  for (let index = 0; index < dotsGroup.children.length * 3; index++) {
    const [dotStart, dotEnd] = [dots[randomIntFromInterval(0, dots.length - 1)], dots[randomIntFromInterval(0, dots.length - 1)]]

    addLineHelper(dotStart, dotEnd)
  }
}
