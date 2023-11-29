import { COLOR } from "./constans"
import { createBasicDots, createBasicLines } from "./forms/forms"
import { dotsGroup, graph, linesGroup } from "./singleton"
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

export const returnBasicColors = () => {
  dotsGroup.children.forEach(mesh => (mesh.material as THREE.MeshBasicMaterial).color.setStyle(COLOR.DOT))
  linesGroup.children.forEach(mesh => (mesh.material as THREE.MeshBasicMaterial).color.setStyle(COLOR.LINE))
}


