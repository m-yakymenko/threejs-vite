import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { TransformControls } from 'three/addons/controls/TransformControls.js';

import { camera, render, renderer, scene } from './singleton'

export const makeObjDraggable = (objects: THREE.Object3D<THREE.Object3DEventMap>[], orbit: OrbitControls) => {
  let draggingObject: THREE.Object3D<THREE.Object3DEventMap> | null = objects[0]

  //orbit.update();
  //orbit.addEventListener('change', render);

  const control = new TransformControls(camera, renderer.domElement);
  control.addEventListener('change', render);
  control.addEventListener('dragging-changed', function (event) {
    orbit.enabled = !event.value;
  });

  control.attach(draggingObject);
  scene.add(control);

}
