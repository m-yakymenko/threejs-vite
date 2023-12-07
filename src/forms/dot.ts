import { Vector3, SphereGeometry, MeshStandardMaterial } from 'three'
import { getPositionInFromOfCamera, setupCameraForPoints } from '../camera/cameraHelpers'
import { COLOR } from '../constans'
import { ReactiveDot } from './ReactiveDot'
import { world } from '../singleton'

export const createDot = (position?: Vector3) => {
  const dotGeometry = new SphereGeometry(0.1)
  const dotMaterial = new MeshStandardMaterial({ color: COLOR.DOT, })
  const sphere = new ReactiveDot(dotGeometry, dotMaterial)
  sphere.position.copy(position || getPositionInFromOfCamera(5))
  sphere.castShadow = true
  sphere.receiveShadow = true
  world.dotsGroup.add(sphere)
  return sphere
}

export const createBasicDots = () => {
  const data = Array(20).fill([0, 0, 0]).map(() => [Math.random() * 10, Math.random() * 8 + 2, Math.random() * 10])
  data.forEach(coord => createDot(new Vector3(...coord)))

  const vectors = data.map(coord => new Vector3(...coord))
  setupCameraForPoints(vectors)
}
