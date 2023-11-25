import * as THREE from 'three'
import { camera, scene } from './singleton'
import { MESH_ELEMENTS_TYPE } from './constans'
import { throttle } from 'throttle-debounce'

export const HOVERED_INTERSECTED = {
  object: null as THREE.Mesh | null,
  currentHex: null as any | null,
}

export const hoverHandler = () => {
  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()

  const onPointerMove = throttle(100, (event: any) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1
    window.requestAnimationFrame(render)
  }, { noLeading: false, noTrailing: false }
  );

  window.addEventListener('pointermove', onPointerMove)

  const render = () => {
    raycaster.setFromCamera(pointer, camera)
    const intersected = raycaster.intersectObjects(scene.children.filter(({ type }) => MESH_ELEMENTS_TYPE.includes(type)), false)[0]

    if (intersected) {
      if (HOVERED_INTERSECTED.object) (HOVERED_INTERSECTED.object.material as THREE.MeshBasicMaterial).color.setHex(HOVERED_INTERSECTED.currentHex)

      HOVERED_INTERSECTED.object = intersected.object as THREE.Mesh
      HOVERED_INTERSECTED.currentHex = (HOVERED_INTERSECTED.object.material as THREE.MeshBasicMaterial).color.getHex();
      (HOVERED_INTERSECTED.object.material as THREE.MeshBasicMaterial).color.setHex(0xff0000)
    } else {
      if (HOVERED_INTERSECTED.object) {
        (HOVERED_INTERSECTED.object.material as THREE.MeshBasicMaterial).color.setHex(HOVERED_INTERSECTED.currentHex)
        HOVERED_INTERSECTED.object = null
        HOVERED_INTERSECTED.currentHex = null
      }
    }
  }
}
