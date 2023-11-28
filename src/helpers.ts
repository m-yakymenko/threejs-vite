import { setStartAndEndDots } from "./algoritms/dijkstra"
import { COLOR } from "./constans"
import { createDotsConnector } from "./forms/dotsConnector"
import { createBasicDots } from "./forms/forms"
import { HOVERED_INTERSECTED } from "./forms/hoverHandler"
import { dotsGroup, graph, linesGroup, state } from "./singleton"
import { clearObject } from "./utils"

export const clearAll = () => {
  linesGroup.clear()
  dotsGroup.clear()
  clearObject(graph)
}

export const createDotsAndLines = () => {
  createBasicDots()
  createDotsConnector()
}

export const returnBasicColors = () => {
  dotsGroup.children.forEach(mesh => (mesh.material as THREE.MeshBasicMaterial).color.setStyle(COLOR.DOT))
  linesGroup.children.forEach(mesh => (mesh.material as THREE.MeshBasicMaterial).color.setStyle(COLOR.LINE))
}

export const selectStartEndDot = (startDot?: THREE.Mesh | null) => {
  state.selectingStartEnd = true
  window.addEventListener('click', () => {
    if (!startDot || !HOVERED_INTERSECTED.object) {
      return selectStartEndDot(startDot || HOVERED_INTERSECTED.object);
    }
    const endDot = HOVERED_INTERSECTED.object;
    (startDot.material as THREE.MeshBasicMaterial).color.setStyle(COLOR.DOT_START);
    (endDot.material as THREE.MeshBasicMaterial).color.setStyle(COLOR.DOT_END);

    setStartAndEndDots(startDot, endDot)
    state.selectingStartEnd = false
  }, { once: true })
}

export const stopSelectStartEndDot = () => {
  state.selectingStartEnd = false
}
