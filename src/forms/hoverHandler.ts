import * as THREE from 'three'
import { camera, dotsGroup } from '../singleton'
import { throttle } from 'throttle-debounce'

export const HOVERED_INTERSECTED = {
  object: null as THREE.Mesh | null,
  objectColor: null as any | null,
  selected: null as THREE.Mesh | null,
  selectedColor: null as any | null,
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

  const isSame = (object: THREE.Mesh) => !!object && !!HOVERED_INTERSECTED.selected && object.id === HOVERED_INTERSECTED.selected.id

  const render = () => {
    raycaster.setFromCamera(pointer, camera)
    const intersected = raycaster.intersectObjects(dotsGroup.children, false)[0]?.object as THREE.Mesh | undefined

    if (intersected) {
      if (!isSame(intersected)) {
        if (HOVERED_INTERSECTED.object) {
          (HOVERED_INTERSECTED.object.material as THREE.MeshBasicMaterial).color.setStyle(HOVERED_INTERSECTED.objectColor)
        }

        HOVERED_INTERSECTED.object = intersected
        HOVERED_INTERSECTED.objectColor = (HOVERED_INTERSECTED.object.material as THREE.MeshBasicMaterial).color.getStyle();
        (HOVERED_INTERSECTED.object.material as THREE.MeshBasicMaterial).color.setStyle('red')
      }
    } else {
      if (HOVERED_INTERSECTED.object) {
        if (!isSame(HOVERED_INTERSECTED.object)) {
          (HOVERED_INTERSECTED.object.material as THREE.MeshBasicMaterial).color.setStyle(HOVERED_INTERSECTED.objectColor)
        }
        HOVERED_INTERSECTED.object = null
        HOVERED_INTERSECTED.objectColor = null

      }
    }
  }
}
