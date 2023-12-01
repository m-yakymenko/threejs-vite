import * as THREE from 'three'
import { camera, dotsGroup } from '../singleton'
import { setupCameraForPoints } from '../camera/cameraHelpers'
import { COLOR } from '../constans'
import { ReactiveDot } from './ReactiveDot'


export const createDot = (position?: THREE.Vector3) => {
  const dotGeometry = new THREE.SphereGeometry(0.1)
  const dotMaterial = new THREE.MeshStandardMaterial({ color: COLOR.DOT, })
  const sphere = new ReactiveDot(dotGeometry, dotMaterial)
  sphere.position.copy(position || new THREE.Vector3().copy(camera.position).setZ(0))
  sphere.castShadow = true
  sphere.receiveShadow = true
  dotsGroup.add(sphere)
  return sphere
}

export const createBasicDots = () => {
  const data = Array(20).fill([0, 0, 0]).map(() => [Math.random() * 10, Math.random() * 8 + 2, Math.random() * 10])
  data.forEach(coord => createDot(new THREE.Vector3(...coord)))

  const vectors = data.map(coord => new THREE.Vector3(...coord))
  setupCameraForPoints(vectors)
}
