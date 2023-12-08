import { HOVERED_INTERSECTED } from "src/helpers/hoverHandler"
import { getCanvasBox } from 'src/helpers'
import { useStateStore } from 'src/store'
import { ReactiveDot } from "src/forms/ReactiveDot"
import { graphManager } from "src/singleton"

const dots = {
  start: null as ReactiveDot | null,
}

export const turnOnDotsConnector = (turn: boolean) => {
  if (turn) {
    getCanvasBox().addEventListener('click', dotsConnector)
  } else {
    getCanvasBox().removeEventListener('click', dotsConnector)
    destroy()
  }

  useStateStore.setState({ isTurnOnDotsConnectorMode: turn })
}

const dotsConnector = () => {
  const selectedObject = HOVERED_INTERSECTED.object

  if (selectedObject) {
    if (dots.start && selectedObject !== dots.start && selectedObject instanceof ReactiveDot) {
      const { isPathExist } = graphManager.addLine(dots.start, selectedObject)
      if (isPathExist) return;
      setSelected(selectedObject)
    } else if (selectedObject instanceof ReactiveDot) {
      setSelected(selectedObject)
    }

  } else {
    destroy()
  }
}

const setSelected = (selectedObject: ReactiveDot) => {
  destroy()
  dots.start = selectedObject
  dots.start.proxy.type = 'selected'
  HOVERED_INTERSECTED.objectType = 'selected'
}

const destroy = () => {
  dots.start && (dots.start.proxy.type = 'dot')
  dots.start = null
}
