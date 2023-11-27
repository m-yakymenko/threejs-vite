import * as THREE from 'three'
import { camera, dotsGroup, linesGroup } from '../singleton'
import { setupCameraForPoints } from '../camera/cameraHelpers'
import { graphDataHelper } from './dotsConnector'
import { randomIntFromInterval } from '../utils'


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

  const vectors = data.map(coord => new THREE.Vector3(...coord))
  setupCameraForPoints(vectors)
  createBasicLines()
}

export const createBasicLines = () => {
  const dots = dotsGroup.children

  for (let index = 0; index < dotsGroup.children.length * 3; index++) {
    const [dotStart, dotEnd] = [dots[randomIntFromInterval(0, dots.length - 1)], dots[randomIntFromInterval(0, dots.length - 1)]]

    const { startSetAdd } = graphDataHelper(dotStart, dotEnd)
    startSetAdd(dotEnd)
  }
}
