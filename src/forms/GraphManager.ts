import { dotsGroup, graph, linesGroup } from "../singleton";
import { ReactiveDot } from "./ReactiveDot";
import { ReactiveLine } from "./ReactiveLine";
import { createLines } from "./line";

export type EdgeArrayType = Array<{
  dot: ReactiveDot,
  line: ReactiveLine,
}>
export type GraphType = { [key: number]: EdgeArrayType }

export class GraphManager {
  //public graph: GraphType

  constructor() {
    //graph = {}
  }

  addLine(dotStart: ReactiveDot, dotSEnd: ReactiveDot) {
    graph[dotStart.id] || (graph[dotStart.id] = [])
    graph[dotSEnd.id] || (graph[dotSEnd.id] = [])

    const startSet = graph[dotStart.id]!
    const endSet = graph[dotSEnd.id]!

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

    for (const [dotId, dots] of Object.entries(graph)) {
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
    Object.keys(graph).forEach(key => delete graph[key as unknown as number])
  }
}
