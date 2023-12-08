import { throttle } from 'throttle-debounce'
import { TransformControls } from 'three/addons/controls/TransformControls.js'
import { graphManager, world } from 'src/singleton';

import { HOVERED_INTERSECTED } from 'src/helpers/hoverHandler'

export const makeObjDraggable = () => {
  const transformControl = new TransformControls(world.camera, world.renderer.domElement)
  const removeAllLinesAndDrawFromScratchThrottle = throttle(100,
    graphManager.removeAllLinesAndDrawFromScratch.bind(graphManager),
    { noLeading: false, noTrailing: false }
  )

  transformControl.addEventListener('dragging-changed', function (event) {
    world.controls.enabled = !event.value
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
