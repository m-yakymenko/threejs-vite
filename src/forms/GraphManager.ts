import { graph } from "../singleton";
import { GraphType } from "../types";
import { ReactiveDot } from "./ReactiveDot";
import { createLines } from "./line";

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
}
