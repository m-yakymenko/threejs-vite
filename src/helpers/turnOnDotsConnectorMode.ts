import * as THREE from 'three'
import { COLOR, MESH_ELEMENTS_TYPE } from "../constans"
import { HOVERED_INTERSECTED } from "./hoverHandler"
import { addLineHelper } from './linesHelper'
import { getCanvasBox } from '../helpers'

export const turnOnDotsConnectorMode = () => {
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
    (HOVERED_INTERSECTED.selected.material as THREE.MeshBasicMaterial).color.setStyle(COLOR.DOT_SELECTED)
  }

  const clickHandler = () => {
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

  getCanvasBox().addEventListener('click', clickHandler)

  return () => getCanvasBox().removeEventListener('click', clickHandler)
}

const turnOnDotsConnectorModeHelper = () => {

}
