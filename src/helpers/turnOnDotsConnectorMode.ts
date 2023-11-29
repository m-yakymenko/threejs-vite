import * as THREE from 'three'
import { COLOR, MESH_ELEMENTS_TYPE } from "../constans"
import { HOVERED_INTERSECTED } from "./hoverHandler"
import { addLineHelper } from './linesHelper'
import { getCanvasBox } from '../helpers'
import { useStateStore } from '../store'

const dots = {
  start: null as THREE.Mesh | null,
  end: null as THREE.Mesh | null,
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
  (HOVERED_INTERSECTED.selected.material as THREE.MeshBasicMaterial).color.setStyle(COLOR.DOT_SELECTED)
}
