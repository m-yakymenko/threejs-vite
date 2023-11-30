import { HOVERED_INTERSECTED } from "./hoverHandler"
import { addLineHelper } from './linesHelper'
import { getCanvasBox } from '../helpers'
import { useStateStore } from '../store'
import { ReactiveDot } from "../forms/ReactiveDot"

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
      const { isPathExist } = addLineHelper(dots.start, selectedObject)
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
  dots.start && (dots.start.proxy.type = 'dot');
  dots.start = null
}
