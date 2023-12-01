//import * as THREE from 'three'
import { TransformControls } from 'three/addons/controls/TransformControls.js'

import { camera, controls, renderer, scene } from '../singleton'
import { HOVERED_INTERSECTED } from './hoverHandler'
import { throttle } from 'throttle-debounce'
import { removeAllLinesAndDrawFromScratch } from './linesHelper'

export const makeObjDraggable = () => {
  const transformControl = new TransformControls(camera, renderer.domElement)
  const removeAllLinesAndDrawFromScratchThrottle = throttle(100, removeAllLinesAndDrawFromScratch, { noLeading: false, noTrailing: false })

  transformControl.addEventListener('dragging-changed', function (event) {
    controls.enabled = !event.value
  })
  transformControl.addEventListener('change', removeAllLinesAndDrawFromScratchThrottle)

  const detach = () => {
    transformControl.detach()
    scene.remove(transformControl)
  }

  const dblclickHandler = () => {
    if (!HOVERED_INTERSECTED.object) return detach()

    if (transformControl.object === HOVERED_INTERSECTED.object) {
      detach()
    } else {
      transformControl.attach(HOVERED_INTERSECTED.object)
      scene.add(transformControl)
    }
  }

  window.addEventListener('dblclick', dblclickHandler)
}
