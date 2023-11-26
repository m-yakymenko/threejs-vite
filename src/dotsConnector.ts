import { MESH_ELEMENTS_TYPE } from "./constans"
import { createLines } from "./forms/forms"
import { HOVERED_INTERSECTED } from "./hoverHandler"
import { render } from "./singleton"

export const createDotsConnector = () => {
  const dots = {
    start: null as THREE.Mesh | null,
    end: null as THREE.Mesh | null,
  }
  const dict = new Set<string>()

  const destroy = () => {
    dots.start = null
    dots.end = null
  }

  window.addEventListener('click', () => {
    const selectedObject = HOVERED_INTERSECTED.object

    if (selectedObject) {
      if (!MESH_ELEMENTS_TYPE.includes(selectedObject.type)) return;
      if (dots.start && selectedObject !== dots.start) {
        dots.end = selectedObject

        const hashStart = dots.start.position.toArray().toString()
        const hashEnd = dots.end.position.toArray().toString()

        if (dict.has(hashStart + hashEnd)) return;
        dict.add(hashStart + hashEnd)

        createLines([
          dots.start.position,
          dots.end.position,
        ])
        render()

        dots.start = dots.end
        dots.end = null
      } else {
        dots.start = selectedObject
      }
    } else {
      destroy()
    }
  })
}
