import { COLOR } from "../constans";
import { HOVERED_INTERSECTED } from "../helpers/hoverHandler";
import { getCanvasBox } from "../helpers";
import { dotsGroup, graph, linesGroup } from "../singleton";
import { MapType } from "../types";
import { randomIntFromInterval } from "../utils";
import { useStateStore } from "../store";
import { ReactiveDot } from "../forms/ReactiveDot";

const findStartEndDot = () => ({
  startDot: dotsGroup.children.find(dot => dot.proxy.type === 'startDot'),
  endDot: dotsGroup.children.find(dot => dot.proxy.type === 'endDot')
})

const selectStartEndDot = () => {
  if (!(HOVERED_INTERSECTED.object instanceof ReactiveDot)) return
  console.log(HOVERED_INTERSECTED.object);
  const { startDot, endDot } = findStartEndDot()

  if (!startDot) {
    HOVERED_INTERSECTED.object.proxy.type = 'startDot'
    HOVERED_INTERSECTED.objectColor = COLOR.DOT_START
  } else if (startDot && endDot) {
    startDot.proxy.type = 'dot'
    endDot.proxy.type = 'startDot'
    HOVERED_INTERSECTED.object.proxy.type = 'endDot'
    HOVERED_INTERSECTED.objectColor = COLOR.DOT_END
  } else {
    HOVERED_INTERSECTED.object.proxy.type = 'endDot'
    HOVERED_INTERSECTED.objectColor = COLOR.DOT_END
  }
}

export const selectStartEndDotHelper = () => {
  const isStartEndDotsSelecting = useStateStore.getState().isStartEndDotsSelecting

  if (isStartEndDotsSelecting) {
    getCanvasBox().removeEventListener('click', selectStartEndDot)
  } else {
    getCanvasBox().addEventListener('click', selectStartEndDot)
  }

  useStateStore.setState({ isStartEndDotsSelecting: !isStartEndDotsSelecting })
}

const resetStartEndDot = () => {
  const { startDot, endDot } = findStartEndDot()
  if (startDot) startDot.proxy.type = 'dot'
  if (endDot) endDot.proxy.type = 'dot'
}

export const setRandomDots = (): void => {
  const startDot = dotsGroup.children[randomIntFromInterval(0, dotsGroup.children.length - 1)]
  const endDot = dotsGroup.children[randomIntFromInterval(0, dotsGroup.children.length - 1)]
  if (startDot === endDot) return setRandomDots()
  resetStartEndDot()
  startDot.proxy.type = 'startDot'
  endDot.proxy.type = 'endDot'
}

export const returnBasicColors = () => {
  dotsGroup.children.forEach(mesh => mesh.material.color.setStyle(COLOR.DOT))
  linesGroup.children.forEach(mesh => mesh.material.color.setStyle(COLOR.LINE))
}


export const findPathByDijkstraAlgorithm = (): void => {
  const { startDot, endDot } = findStartEndDot()
  if (startDot === endDot || !startDot || !endDot) {
    selectStartEndDotHelper()
    return alert('Choose start and end dots')
  }
  returnBasicColors()

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
          line.material.color.setStyle(COLOR.LINE_CHECKED)
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
    const dotsLines = [startDot.id, ...end.previousNodeId]
      .map((nodeId, i, arr) => graph[nodeId].find(({ dot }) => dot.id === arr[i + 1])!)
      .filter(Boolean)


    console.log(dotsLines);
    if (!dotsLines.length) {
      return alert("Path doesn't exist")
    }

    dotsLines.forEach(({ dot, line }) => {
      dot.material.color.setStyle(COLOR.LINE_PATH_TO_END);
      line.material.color.setStyle(COLOR.LINE_PATH_TO_END);
    })
  }

  loop({ [startDot.id]: graph[startDot.id] })
}
