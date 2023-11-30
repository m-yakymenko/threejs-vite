import { COLOR } from "../constans";
import { HOVERED_INTERSECTED } from "../helpers/hoverHandler";
import { getCanvasBox, returnBasicColors } from "../helpers";
import { dotsGroup, graph } from "../singleton";
import { MapType, ThreeDotType } from "../types";
import { randomIntFromInterval } from "../utils";
import { useStateStore } from "../store";

const startEndDot = new Proxy({ startDot: null, endDot: null } as { startDot: ThreeDotType | null, endDot: ThreeDotType | null }, {
  set(obj, key, newValue) {
    switch (true) {
      case key === 'startDot':

        break;
    }

    return Reflect.set(obj, key, newValue)
  },
})

const selectStartEndDot = () => {
  if (!startEndDot.startDot) {
    startEndDot.startDot = HOVERED_INTERSECTED.object as ThreeDotType
    HOVERED_INTERSECTED.objectColor = COLOR.DOT_START
  } else if (startEndDot.startDot && startEndDot.endDot) {
    startEndDot.startDot.material.color.setStyle(COLOR.DOT);
    startEndDot.endDot.material.color.setStyle(COLOR.DOT_START);
    startEndDot.startDot = startEndDot.endDot

    startEndDot.endDot = HOVERED_INTERSECTED.object as ThreeDotType
    HOVERED_INTERSECTED.objectColor = COLOR.DOT_END
  } else {
    startEndDot.endDot = HOVERED_INTERSECTED.object as ThreeDotType
    HOVERED_INTERSECTED.objectColor = COLOR.DOT_END
  }

  colorizeStartEndDots()
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

export const setRandomDots = (): void => {
  startEndDot.startDot = dotsGroup.children[randomIntFromInterval(0, dotsGroup.children.length - 1)]
  startEndDot.endDot = dotsGroup.children[randomIntFromInterval(0, dotsGroup.children.length - 1)]
  if (startEndDot.startDot === startEndDot.endDot) return setRandomDots()
  returnBasicColors()
  colorizeStartEndDots()
}

const colorizeStartEndDots = () => {
  startEndDot.startDot && startEndDot.startDot.material.color.setStyle(COLOR.DOT_START);
  startEndDot.endDot && startEndDot.endDot.material.color.setStyle(COLOR.DOT_END);
}

export const findPathByDijkstraAlgorithm = (): void => {
  const { startDot, endDot } = startEndDot
  if (startDot === endDot || !startDot || !endDot) {
    selectStartEndDotHelper()
    return alert('Choose start and end dots')
  }
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
    const dotsLines = [startDot.id, ...end.previousNodeId]
      .map((nodeId, i, arr) => graph[nodeId].find(({ dot }) => dot.id === arr[i + 1])!)
      .filter(Boolean)


    console.log(dotsLines);
    if (!dotsLines.length) {
      return alert("Path doesn't exist")
    }

    dotsLines.forEach(({ dot, line }) => {
      (dot.material as THREE.MeshBasicMaterial).color.setStyle(COLOR.LINE_PATH_TO_END);
      (line.material as THREE.MeshBasicMaterial).color.setStyle(COLOR.LINE_PATH_TO_END);
    })
    colorizeStartEndDots()
  }

  loop({ [startDot.id]: graph[startDot.id] })
}
