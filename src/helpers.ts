
import { createBasicDots } from "./forms/dot"
import { createBasicLines } from "./forms/line"
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

export const getCanvasBox = () => document.getElementById('canvas')!
