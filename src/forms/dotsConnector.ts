import * as THREE from 'three'
import { MESH_ELEMENTS_TYPE } from "../constans"
import { createLines } from "./forms"
import { HOVERED_INTERSECTED } from "./hoverHandler"
import { dotsGroup, linesGroup } from "../singleton"
import { transformControlsTransformingEventName } from '../events'
import { throttle } from 'throttle-debounce'

type EdgeArrayType = Array<{
  dot: THREE.Mesh,
  line: THREE.Line
}>
type MapType = { [key: number]: EdgeArrayType }
const graph: MapType = {}

const createLinesHandler = () => {
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

export const graphDataHelper = (dotStart: THREE.Mesh, dotSEnd: THREE.Mesh) => {
  graph[dotStart.id] || (graph[dotStart.id] = [])
  graph[dotSEnd.id] || (graph[dotSEnd.id] = [])

  const startSet = graph[dotStart.id]!
  const endSet = graph[dotSEnd.id]!

  const isPathExist = startSet.find(edge => edge.dot === dotSEnd) || endSet.find(edge => edge.dot === dotStart)
  const startSetAdd = (dot: THREE.Mesh) => {
    if (isPathExist) return;
    const line = createLines([dotStart.position, dotSEnd.position]);
    startSet.push({ dot, line })
  }

  return { startSet, endSet, startSetAdd, isPathExist }
}

export const createDotsConnector = () => {
  const dots = {
    start: null as THREE.Mesh | null,
    end: null as THREE.Mesh | null,
  }


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



  window.addEventListener(
    transformControlsTransformingEventName,
    throttle(100, createLinesHandler, { noLeading: false, noTrailing: false })
  )

  window.addEventListener('click', () => {
    const selectedObject = HOVERED_INTERSECTED.object

    if (selectedObject) {
      if (!MESH_ELEMENTS_TYPE.includes(selectedObject.type)) return;
      if (dots.start && selectedObject !== dots.start) {
        dots.end = selectedObject

        const { isPathExist, startSetAdd } = graphDataHelper(dots.start, dots.end)

        if (isPathExist) return;
        destroySelectedIntersected()
        startSetAdd(dots.end);

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
