import * as THREE from 'three'
import { MESH_ELEMENTS_TYPE } from "../constans"
import { createLines } from "./forms"
import { HOVERED_INTERSECTED } from "./hoverHandler"
import { dotsGroup, linesGroup } from "../singleton"
import { transformControlsTransformingEventName } from '../events'
import { throttle } from 'throttle-debounce'
import { randomIntFromInterval } from '../utils'

type EdgeArrayType = Array<{
  dot: THREE.Mesh,
  line: THREE.Line,
  distance: number,
}>
type MapType = { [key: number]: EdgeArrayType }
const graph: MapType = {}

export const findPathByDijkstraAlgorithm = (): void => {
  const startDot = dotsGroup.children[randomIntFromInterval(0, dotsGroup.children.length - 1)]
  const endDot = dotsGroup.children[randomIntFromInterval(0, dotsGroup.children.length - 1)]
  if (startDot === endDot) return findPathByDijkstraAlgorithm()

  const currentQueue: MapType = {}
  const nextQueue: MapType = {};

  const pathMap = new Map<number,
    {
      distance: number;
      path: number[];
    }
  >();

  Object.keys(graph).forEach(key => pathMap.set(+key, {
    distance: Infinity,
    path: [],
  }))

  currentQueue[startDot.id] = graph[startDot.id]

  for (const [previousDotId, dots] of Object.entries(currentQueue)) {
    for (let i = 0; i < dots.length; i++) {
      const line = dots[i].line
      line.computeLineDistances();
      pathMap.set(dots[i].dot.id, {
        distance: line.geometry.attributes.lineDistance.getX(line.geometry.attributes.lineDistance.count - 1),
        path: [+previousDotId]
      })
    }
  }

  console.log(pathMap);

}

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

export const addLineHelper = (dotStart: THREE.Mesh, dotSEnd: THREE.Mesh) => {
  graph[dotStart.id] || (graph[dotStart.id] = [])
  graph[dotSEnd.id] || (graph[dotSEnd.id] = [])

  const startSet = graph[dotStart.id]!
  const endSet = graph[dotSEnd.id]!

  const isPathExist = startSet.find(edge => edge.dot === dotSEnd) || endSet.find(edge => edge.dot === dotStart)

  if (!isPathExist) {
    const line = createLines([dotStart.position, dotSEnd.position]);
    startSet.push({ dot: dotSEnd, line, distance: Infinity })
  }

  return { startSet, endSet, isPathExist }
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
    (HOVERED_INTERSECTED.selected.material as THREE.MeshBasicMaterial).color.setStyle('brown')
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

        const { isPathExist } = addLineHelper(dots.start, dots.end)
        if (isPathExist) return;
        destroySelectedIntersected()

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
