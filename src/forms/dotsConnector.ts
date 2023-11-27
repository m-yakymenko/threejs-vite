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
}>
type MapType = { [key: number]: EdgeArrayType }
const graph: MapType = {}

export const findPathByDijkstraAlgorithm = (): void => {
  const startDot = dotsGroup.children[randomIntFromInterval(0, dotsGroup.children.length - 1)]
  const endDot = dotsGroup.children[randomIntFromInterval(0, dotsGroup.children.length - 1)]
  if (startDot === endDot) return findPathByDijkstraAlgorithm();
  (startDot.material as THREE.MeshBasicMaterial).color.setStyle('blue');
  (endDot.material as THREE.MeshBasicMaterial).color.setStyle('yellow');

  const linesLengthsMap = new WeakMap<THREE.Line, number>()

  const pathMap = new Map<number,
    {
      distance: number;
      previousNodeId: number[];
    }
  >();

  Object.keys(graph).forEach(key => pathMap.set(+key, {
    distance: Infinity,
    previousNodeId: [],
  }))


  const loop = (currentQueue: MapType) => {
    const nextQueue: MapType = {};

    for (const [previousDotId, dots] of Object.entries(currentQueue)) {
      for (let i = 0; i < dots.length; i++) {
        const currentDotId = dots[i].dot.id
        const line = dots[i].line

        let lineLength = linesLengthsMap.get(line)
        if (!lineLength) {
          line.computeLineDistances();
          lineLength = line.geometry.attributes.lineDistance.getX(line.geometry.attributes.lineDistance.count - 1);
          (line.material as THREE.MeshBasicMaterial).color.setStyle('red')
        }

        const currentGraph = pathMap.get(currentDotId)!
        const previousGraph = pathMap.get(+previousDotId)!
        lineLength += previousGraph.distance === Infinity ? 0 : previousGraph.distance

        console.log({ lineLength, currentGraph, previousGraph });

        if (currentGraph.distance === Infinity || currentGraph.distance > lineLength) {
          pathMap.set(currentDotId, {
            distance: lineLength,
            previousNodeId: [...previousGraph.previousNodeId, +currentDotId]
          })

          nextQueue[currentDotId] = graph[currentDotId]
        } else {
          console.log('eject');

        }
      }
    }

    setTimeout(() => {
      if (Object.keys(nextQueue).length) {
        loop(nextQueue)
      } else {
        printResults()
      }
    }, 500);
  }

  const printResults = () => {
    console.log({ pathMap, graph });
    console.log({ startDot: startDot.id, endDot: endDot.id });
    console.log('final', pathMap.get(endDot.id));

    const end = pathMap.get(endDot.id)!;
    const dots = [startDot.id, ...end.previousNodeId]
      .map((nodeId, i, arr) => graph[nodeId].find(({ dot }) => dot.id === arr[i + 1])?.line)
      .filter(Boolean)


    console.log(dots);

    dots.forEach(dot => (dot?.material as THREE.MeshBasicMaterial).color.setStyle('green'))
  }

  loop({ [startDot.id]: graph[startDot.id] })
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
    startSet.push({ dot: dotSEnd, line })
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
