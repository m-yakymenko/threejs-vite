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

