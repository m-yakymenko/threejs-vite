import * as THREE from 'three'
import { camera, controls } from '../singleton'

export const setupCameraForPoints = (points: THREE.Vector3[]) => {
  const boundingBox = new THREE.Box3().setFromPoints(points)

  const center = new THREE.Vector3()
  boundingBox.getCenter(center)

  const size = new THREE.Vector3()
  boundingBox.getSize(size)

  const maxSize = Math.max(size.x, size.y, size.z)
  const distance = maxSize / (1.2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)))

  camera.position.copy(center)
  camera.position.z += distance

  controls.target.set(center.x, center.y, center.z)
  camera.lookAt(center)

}
