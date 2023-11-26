//import * as THREE from 'three'
import { TransformControls } from 'three/addons/controls/TransformControls.js';

import { camera, controls, renderer, scene } from './singleton'
import { HOVERED_INTERSECTED } from './hoverHandler'
import { transformControlsTransformingEvent } from './events';

export const makeObjDraggable = () => {
  const transformControl = new TransformControls(camera, renderer.domElement)

  transformControl.addEventListener('dragging-changed', function (event) {
    controls.enabled = !event.value
  })
  transformControl.addEventListener('change', () => window.dispatchEvent(transformControlsTransformingEvent));


  const dblclickHandler = () => {
    if (!HOVERED_INTERSECTED.object) return

    if (transformControl.object === HOVERED_INTERSECTED.object) {
      transformControl.detach()
      scene.remove(transformControl)
    } else {
      transformControl.attach(HOVERED_INTERSECTED.object)
      scene.add(transformControl);
    }
  }

  window.addEventListener('dblclick', dblclickHandler);
}
