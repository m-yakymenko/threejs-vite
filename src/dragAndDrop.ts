import { OrbitControls } from 'three/examples/jsm/Addons.js'

import { DragControls } from 'three/addons/controls/DragControls.js'
import { camera, render, renderer } from './singleton'

export const makeObjDraggable = (objects: THREE.Object3D<THREE.Object3DEventMap>[], orbitControl: OrbitControls) => {
  const controls = new DragControls(objects, camera, renderer.domElement)

  controls.addEventListener('drag', render)
  controls.addEventListener('dragstart', () => {
    orbitControl.enabled = false
  })
  controls.addEventListener('dragend', () => {
    orbitControl.enabled = true
  })
}
