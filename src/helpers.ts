import { createBasicDots } from "./forms/dot"
import { createBasicLines } from "./forms/line"
import { world } from "./singleton"

export const createRandomDotsAndLines = () => {
  createBasicDots()
  createBasicLines()
}

export const getCanvasBox = () => document.getElementById('canvas')!

export const clearSelection = () => {
  world.linesGroup.children.forEach(mesh => mesh.proxy.type = 'line')
  world.dotsGroup.children.forEach(mesh => mesh.proxy.type = 'dot')
}
