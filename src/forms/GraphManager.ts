import { dotsGroup, linesGroup } from "../singleton";
import { ReactiveDot } from "./ReactiveDot";
import { ReactiveLine } from "./ReactiveLine";
import { createLines } from "./line";

export type EdgeArrayType = Array<{
  dot: ReactiveDot,
  line: ReactiveLine,
}>
export type GraphType = { [key: number]: EdgeArrayType }

export class GraphManager {
  public graph: GraphType

  constructor() {
    this.graph = {}
  }

  addLine(dotStart: ReactiveDot, dotSEnd: ReactiveDot) {
    this.graph[dotStart.id] || (this.graph[dotStart.id] = [])
    this.graph[dotSEnd.id] || (this.graph[dotSEnd.id] = [])

    const startSet = this.graph[dotStart.id]!
    const endSet = this.graph[dotSEnd.id]!

    const isPathExist = startSet.find(edge => edge.dot === dotSEnd) || endSet.find(edge => edge.dot === dotStart)

    if (!isPathExist) {
      const line = createLines([dotStart.position, dotSEnd.position])
      startSet.push({ dot: dotSEnd, line })
      endSet.push({ dot: dotStart, line })
    }

    return { startSet, endSet, isPathExist }
  }

  removeAllLinesAndDrawFromScratch() {
    linesGroup.clear()

    for (const [dotId, dots] of Object.entries(this.graph)) {
      const dot = dotsGroup.children.find(child => child.id === +dotId)
      if (!dot) return

      dots.forEach(endDot => {
        endDot.line = createLines([
          dot.position,
          endDot.dot.position,
        ])
      })
    }
  }

  clear() {
    linesGroup.clear()
    dotsGroup.clear()
    this.graph = {}
  }
}
