import { throttle } from "throttle-debounce"
import { transformControlsTransformingEventName } from "../events"
import { createLines } from "../forms/forms"
import { dotsGroup, graph, linesGroup } from "../singleton"


export const createLinesHelper = () => {
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

window.addEventListener(
  transformControlsTransformingEventName,
  throttle(100, createLinesHelper, { noLeading: false, noTrailing: false })
)
