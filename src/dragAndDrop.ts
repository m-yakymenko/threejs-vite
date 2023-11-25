//import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { TransformControls } from 'three/addons/controls/TransformControls.js';

import { camera, render, renderer, scene } from './singleton'
import { HOVERED_INTERSECTED } from './hoverHandler'

export const makeObjDraggable = (orbit: OrbitControls) => {
  const control = new TransformControls(camera, renderer.domElement)
  control.addEventListener('change', render)
  control.addEventListener('dragging-changed', function (event) {
    orbit.enabled = !event.value
  })

  const dblclickHandler = () => {
    if (!HOVERED_INTERSECTED.object) return

    if (control.object === HOVERED_INTERSECTED.object) {
      control.detach()
      scene.remove(control)
    } else {
      control.attach(HOVERED_INTERSECTED.object);
      scene.add(control);
    }
  }

  window.addEventListener('dblclick', dblclickHandler);
}
