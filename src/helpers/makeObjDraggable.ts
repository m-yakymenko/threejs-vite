import { world } from './../singleton';
//import * as THREE from 'three'
import { TransformControls } from 'three/addons/controls/TransformControls.js'

import { camera, controls, graphManager, renderer } from '../singleton'
import { HOVERED_INTERSECTED } from './hoverHandler'
import { throttle } from 'throttle-debounce'

export const makeObjDraggable = () => {
  const transformControl = new TransformControls(camera, renderer.domElement)
  const removeAllLinesAndDrawFromScratchThrottle = throttle(100,
    graphManager.removeAllLinesAndDrawFromScratch.bind(graphManager),
    { noLeading: false, noTrailing: false }
  )

  transformControl.addEventListener('dragging-changed', function (event) {
    controls.enabled = !event.value
  })
  transformControl.addEventListener('change', removeAllLinesAndDrawFromScratchThrottle)

  const detach = () => {
    transformControl.detach()
    world.scene.remove(transformControl)
  }

  const dblclickHandler = () => {
    if (!HOVERED_INTERSECTED.object) return detach()

    if (transformControl.object === HOVERED_INTERSECTED.object) {
      detach()
    } else {
      transformControl.attach(HOVERED_INTERSECTED.object)
      world.scene.add(transformControl)
    }
  }

  window.addEventListener('dblclick', dblclickHandler)
}
