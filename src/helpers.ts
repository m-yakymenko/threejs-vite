import * as THREE from 'three'
import { createBasicDots } from "./forms/dot"
import { createBasicLines } from "./forms/line"
import { camera, dotsGroup, graph, linesGroup } from "./singleton"
import { clearObject } from "./utils"

export const clearAll = () => {
  linesGroup.clear()
  dotsGroup.clear()
  clearObject(graph)
}

export const createRandomDotsAndLines = () => {
  createBasicDots()
  createBasicLines()
}

export const getCanvasBox = () => document.getElementById('canvas')!

export const getPositionInFromOfCamera = (dist: number) => {
  const vector = new THREE.Vector3()

  camera.getWorldDirection(vector)

  vector.multiplyScalar(dist)
  vector.add(camera.position)

  return vector
}
