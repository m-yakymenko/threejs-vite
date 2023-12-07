import { world } from './../singleton';
import { Box3, Vector3, MathUtils } from 'three'
import { controls } from '../singleton'

export const setupCameraForPoints = (points: Vector3[]) => {
  const boundingBox = new Box3().setFromPoints(points)

  const center = new Vector3()
  boundingBox.getCenter(center)

  const size = new Vector3()
  boundingBox.getSize(size)

  const maxSize = Math.max(size.x, size.y, size.z)
  const distance = maxSize / (1.2 * Math.tan(MathUtils.degToRad(world.camera.fov / 2)))

  world.camera.position.copy(center)
  world.camera.position.z += distance

  controls.target.set(center.x, center.y, center.z)
  world.camera.lookAt(center)

}
