import * as THREE from 'three'
import { camera, dotsGroup, linesGroup } from '../singleton'
import { setupCameraForPoints } from '../cameraHelpers'


const lineMaterial = new THREE.LineBasicMaterial({
  color: 'blue',
  linewidth: 5, // in pixels
  precision: 'lowp'
})
export const createLines = (points: THREE.Vector3[]) => {
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
  const line = new THREE.Line(lineGeometry, lineMaterial)
  linesGroup.add(line)
  return line
}

export const createDot = (position?: THREE.Vector3) => {
  const dotGeometry = new THREE.SphereGeometry(0.1);
  const dotMaterial = new THREE.MeshBasicMaterial({ color: 'green' });
  const sphere = new THREE.Mesh(dotGeometry, dotMaterial);
  sphere.position.copy(position || new THREE.Vector3().copy(camera.position).setZ(0));
  dotsGroup.add(sphere)

  return sphere;
}

export const createBasicDots = () => {
  const data = Array(20).fill([0, 0, 0]).map(() => [Math.random() * 10, Math.random() * 10, 0])
  data.forEach(coord => createDot(new THREE.Vector3(...coord)))

  setupCameraForPoints(data.map(coord => new THREE.Vector3(...coord)))
}
