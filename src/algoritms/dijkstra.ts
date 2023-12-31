import { HOVERED_INTERSECTED } from "src/helpers/hoverHandler"
import { getCanvasBox } from "src/helpers"
import { graphManager, world } from "src/singleton"
import { randomIntFromInterval } from "src/utils"
import { useStateStore } from "src/store"
import { ReactiveDot } from "src/forms/ReactiveDot"
import { ReactiveLine } from "src/forms/ReactiveLine"
import { GraphType } from "src/classes/GraphManager"

const findStartEndDot = () => ({
  startDot: world.dotsGroup.children.find(dot => dot.proxy.type === 'startDot'),
  endDot: world.dotsGroup.children.find(dot => dot.proxy.type === 'endDot')
})

const selectStartEndDot = () => {
  if (!(HOVERED_INTERSECTED.object instanceof ReactiveDot)) return
  const { startDot, endDot } = findStartEndDot()

  if (!startDot) {
    HOVERED_INTERSECTED.object.proxy.type = 'startDot'
    HOVERED_INTERSECTED.objectType = 'startDot'
  } else if (startDot && endDot) {
    startDot.proxy.type = 'dot'
    endDot.proxy.type = 'startDot'
    HOVERED_INTERSECTED.object.proxy.type = 'endDot'
    HOVERED_INTERSECTED.objectType = 'endDot'
  } else {
    HOVERED_INTERSECTED.object.proxy.type = 'endDot'
    HOVERED_INTERSECTED.objectType = 'endDot'
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

export const setRandomStartEndDots = (): void => {
  const startDot = world.dotsGroup.children[randomIntFromInterval(0, world.dotsGroup.children.length - 1)]
  const endDot = world.dotsGroup.children[randomIntFromInterval(0, world.dotsGroup.children.length - 1)]
  if (startDot === endDot) return setRandomStartEndDots()
  resetStartEndDot()
  startDot.proxy.type = 'startDot'
  endDot.proxy.type = 'endDot'
}

export const returnBasicColors = () => {
  const typesToClear: ReactiveLine['proxy']['type'][] = ["pathToEnd", 'pathChecked']
  world.dotsGroup.children.forEach(mesh => mesh.proxy.type === "pathToEnd" && (mesh.proxy.type = "dot"))
  world.linesGroup.children.forEach(mesh => typesToClear.includes(mesh.proxy.type) && (mesh.proxy.type = "line"))
}


export const findPathByDijkstraAlgorithm = (): void => {
  const { startDot, endDot } = findStartEndDot()
  if (startDot === endDot || !startDot || !endDot) {
    selectStartEndDotHelper()
    return alert('Choose start and end dots')
  }
  returnBasicColors()
  useStateStore.setState({ isStartEndDotsSelecting: false })

  const linesLengthsMap = new WeakMap<ReactiveLine, number>()

  const pathMap = new Map<number, {
    distance: number,
    previousNodeId: number[],
  }
  >()

  Object.keys(graphManager.graph).forEach(key => pathMap.set(+key, {
    distance: Infinity,
    previousNodeId: [],
  }))


  const loop = (currentQueue: GraphType) => {
    const nextQueue: GraphType = {}

    for (const [previousDotId, dots] of Object.entries(currentQueue)) {
      for (let i = 0; i < dots.length; i++) {
        const currentDotId = dots[i].dot.id
        const line = dots[i].line

        let lineLength = linesLengthsMap.get(line)
        if (!lineLength) {
          line.computeLineDistances()
          lineLength = line.geometry.attributes.lineDistance.getX(line.geometry.attributes.lineDistance.count - 1)
          line.proxy.type = 'pathChecked'
        }

        const currentGraph = pathMap.get(currentDotId)!
        const previousGraph = pathMap.get(+previousDotId)!
        lineLength += previousGraph.distance === Infinity ? 0 : previousGraph.distance

        //console.log({ lineLength, currentGraph, previousGraph })

        if (currentGraph.distance === Infinity || currentGraph.distance > lineLength) {
          pathMap.set(currentDotId, {
            distance: lineLength,
            previousNodeId: [...previousGraph.previousNodeId, +currentDotId]
          })

          nextQueue[currentDotId] = graphManager.graph[currentDotId]
        }
      }
    }

    setTimeout(() => {
      if (Object.keys(nextQueue).length) {
        loop(nextQueue)
      } else {
        printResults()
      }
    }, 500)
  }

  const printResults = () => {
    //console.log({ pathMap, graph }),
    //console.log({ startDot: startDot.id, endDot: endDot.id }),
    //console.log('final', pathMap.get(endDot.id)),

    const end = pathMap.get(endDot.id)!
    const dotsLines = [startDot.id, ...end.previousNodeId]
      .map((nodeId, i, arr) => graphManager.graph[nodeId].find(({ dot }) => dot.id === arr[i + 1])!)
      .filter(Boolean)


    //console.log(dotsLines)
    if (!dotsLines.length) {
      return alert("Path doesn't exist")
    }

    returnBasicColors()

    dotsLines.forEach(({ dot, line }, index) => {
      setTimeout(() => {
        dot.proxy.type === 'dot' && (dot.proxy.type = "pathToEnd") // dont chose last one
        line.proxy.type = "pathToEnd"
      }, 500 * index)
    })
  }

  loop({ [startDot.id]: graphManager.graph[startDot.id] })
}
