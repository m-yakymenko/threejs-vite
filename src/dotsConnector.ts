import * as THREE from 'three'
import { MESH_ELEMENTS_TYPE } from "./constans"
import { createLines } from "./forms/forms"
import { HOVERED_INTERSECTED } from "./hoverHandler"
import { dotsGroup, linesGroup } from "./singleton"

type SetType = Array<THREE.Mesh>
type MapType = { [key: number]: SetType }

export const createDotsConnector = () => {
  const dots = {
    start: null as THREE.Mesh | null,
    end: null as THREE.Mesh | null,
  }

  const graph: MapType = {}
  let lines: THREE.Line[] = []

  const destroy = () => {
    dots.start = null
    dots.end = null
    destroySelectedIntersected()
  }

  const destroySelectedIntersected = () => {
    (HOVERED_INTERSECTED.selected?.material as THREE.MeshBasicMaterial)?.color.setStyle(HOVERED_INTERSECTED.selectedColor)
    HOVERED_INTERSECTED.selected = null
    HOVERED_INTERSECTED.selectedColor = null
  }

  const setSelectedIntersected = () => {
    HOVERED_INTERSECTED.selected = HOVERED_INTERSECTED.object!;
    HOVERED_INTERSECTED.selectedColor = HOVERED_INTERSECTED.objectColor;
    (HOVERED_INTERSECTED.selected.material as THREE.MeshBasicMaterial).color.setStyle('yellow')
  }

  const createLinesHandler = () => {

    linesGroup.clear()
    lines = []

    for (const [dotId, dots] of Object.entries(graph)) {
      const dot = dotsGroup.children.find(child => child.id === +dotId)
      if (!dot) return

      dots.forEach(endDot => {
        const line = createLines([
          dot.position,
          endDot.position,
        ])
        lines.push(line)
      })
    }

    linesGroup.add(...lines)
  }

  window.addEventListener('click', () => {
    const selectedObject = HOVERED_INTERSECTED.object

    if (selectedObject) {
      if (!MESH_ELEMENTS_TYPE.includes(selectedObject.type)) return;
      if (dots.start && selectedObject !== dots.start) {
        destroySelectedIntersected()
        dots.end = selectedObject

        graph[dots.start.id] || (graph[dots.start.id] = [])
        graph[dots.end.id] || (graph[dots.end.id] = [])

        const startSet = graph[dots.start.id]!
        const endSet = graph[dots.end.id]!

        if (startSet.includes(dots.end) || endSet.includes(dots.start)) return;
        startSet.push(dots.end);

        createLinesHandler()

        dots.start = dots.end
        dots.end = null
      } else {
        dots.start = selectedObject
      }

      setSelectedIntersected()
    } else {
      destroy()
    }
  })
}
