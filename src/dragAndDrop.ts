import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { DragControls } from 'three/addons/controls/DragControls.js'
import { debounce, throttle } from 'throttle-debounce';

import { camera, render, renderer } from './singleton'

export const makeObjDraggable = (objects: THREE.Object3D<THREE.Object3DEventMap>[], orbitControl: OrbitControls) => {
  let controls = new DragControls(objects, camera, renderer.domElement)
  let draggingObject: THREE.Object3D<THREE.Object3DEventMap> | null = null

  const throttleFunc = throttle(
    10,
    (event: unknown) => {
      if (draggingObject) {
        //controls.deactivate()
        const direction = new THREE.Vector3()
        camera.getWorldDirection(direction)
        direction.normalize()
        direction.multiplyScalar((event as WheelEvent).deltaY / 100)
        draggingObject.position.add(direction)
        //controls.dispatchEvent({ type: 'drag', object: draggingObject! });

      }
    },
    { noLeading: false, noTrailing: false }
  );

  document.addEventListener('mousewheel', throttleFunc);

  controls.addEventListener('drag', (event) => {

  })
  controls.addEventListener('dragstart', (event) => {
    draggingObject = event.object
    orbitControl.enabled = false
  })
  controls.addEventListener('dragend', () => {
    draggingObject = null
    orbitControl.enabled = true
  })
}
