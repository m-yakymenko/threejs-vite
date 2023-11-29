import { COLOR } from "../constans";
import { HOVERED_INTERSECTED, resetSelected } from "../helpers/hoverHandler";
import { returnBasicColors } from "../helpers";
import { dotsGroup, graph } from "../singleton";
import { MapType } from "../types";
import { randomIntFromInterval } from "../utils";

const startEndDot = { startDot: null, endDot: null } as { startDot: THREE.Mesh | null, endDot: THREE.Mesh | null }

export const selectStartDot = () => {
  startEndDot.startDot = HOVERED_INTERSECTED.selected
  resetSelected()
  colorizeStartEndDots()
}
export const selectEndDot = () => {
  startEndDot.endDot = HOVERED_INTERSECTED.selected
  resetSelected()
  colorizeStartEndDots()
}
export const startWithRandomDots = (): void => {
  startEndDot.startDot = dotsGroup.children[randomIntFromInterval(0, dotsGroup.children.length - 1)]
  startEndDot.endDot = dotsGroup.children[randomIntFromInterval(0, dotsGroup.children.length - 1)]
  if (startEndDot.startDot === startEndDot.endDot) return startWithRandomDots()
  findPathByDijkstraAlgorithm()
}


const colorizeStartEndDots = () => {
  startEndDot.startDot && (startEndDot.startDot.material as THREE.MeshBasicMaterial).color.setStyle(COLOR.DOT_START);
  startEndDot.endDot && (startEndDot.endDot.material as THREE.MeshBasicMaterial).color.setStyle(COLOR.DOT_END);
}

export const findPathByDijkstraAlgorithm = (): void => {
  const { startDot, endDot } = startEndDot
  if (startDot === endDot || !startDot || !endDot) return
  returnBasicColors()
  colorizeStartEndDots()

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
          (line.material as THREE.MeshBasicMaterial).color.setStyle(COLOR.LINE_CHECKED)
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
    if (!dots.length) {
      return alert("Path doesn't exist")
    }

    dots.forEach(dot => (dot?.material as THREE.MeshBasicMaterial).color.setStyle(COLOR.LINE_PATH_TO_END))
    colorizeStartEndDots()
  }

  loop({ [startDot.id]: graph[startDot.id] })
}
