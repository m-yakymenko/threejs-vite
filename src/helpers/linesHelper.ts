import { createLines } from "../forms/line"
import { dotsGroup, graph, linesGroup } from "../singleton"


export const removeAllLinesAndDrawFromScratch = () => {
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

export const addLineHelper = (dotStart: THREE.Mesh, dotSEnd: THREE.Mesh) => {
  graph[dotStart.id] || (graph[dotStart.id] = [])
  graph[dotSEnd.id] || (graph[dotSEnd.id] = [])

  const startSet = graph[dotStart.id]!
  const endSet = graph[dotSEnd.id]!

  const isPathExist = startSet.find(edge => edge.dot === dotSEnd) || endSet.find(edge => edge.dot === dotStart)

  if (!isPathExist) {
    const line = createLines([dotStart.position, dotSEnd.position]);
    startSet.push({ dot: dotSEnd, line })
  }

  return { startSet, endSet, isPathExist }
}
