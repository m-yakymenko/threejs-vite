//import * as THREE from 'three'
import { TransformControls } from 'three/addons/controls/TransformControls.js';

import { camera, controls, renderer, scene } from './singleton'
import { HOVERED_INTERSECTED } from './hoverHandler'

export const makeObjDraggable = () => {
  const control = new TransformControls(camera, renderer.domElement)
  control.addEventListener('dragging-changed', function (event) {
    controls.enabled = !event.value
  })

  const dblclickHandler = () => {
    if (!HOVERED_INTERSECTED.object) return

    if (control.object === HOVERED_INTERSECTED.object) {
      control.detach()
      scene.remove(control)
    } else {
      control.attach(HOVERED_INTERSECTED.object)
      scene.add(control);
    }
  }

  window.addEventListener('dblclick', dblclickHandler);
}
