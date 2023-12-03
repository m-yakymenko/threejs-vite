import { Vector3 } from 'three'
import { createBasicDots } from "./forms/dot"
import { createBasicLines } from "./forms/line"
import { camera, dotsGroup, linesGroup } from "./singleton"

export const createRandomDotsAndLines = () => {
  createBasicDots()
  createBasicLines()
}

export const getCanvasBox = () => document.getElementById('canvas')!

export const getPositionInFromOfCamera = (dist: number) => {
  const vector = new Vector3()

  camera.getWorldDirection(vector)

  vector.multiplyScalar(dist)
  vector.add(camera.position)

  return vector
}

export const clearSelection = () => {
  linesGroup.children.forEach(mesh => mesh.proxy.type = 'line')
  dotsGroup.children.forEach(mesh => mesh.proxy.type = 'dot')
}
