import * as THREE from 'three'
import { camera, dotsGroup } from '../singleton'
import { throttle } from 'throttle-debounce'
import { COLOR } from '../constans'
import { ReactiveDot } from '../forms/ReactiveDot'
import { ThreeLineType } from '../types'

export const HOVERED_INTERSECTED = {
  object: null as ReactiveDot | ThreeLineType | null,
  objectColor: null as any | null,
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
    const intersected = raycaster.intersectObjects(dotsGroup.children, false)[0]?.object as ReactiveDot | ThreeLineType | undefined

    if (intersected) {
      if (HOVERED_INTERSECTED.object) {
        HOVERED_INTERSECTED.object.material.color.setStyle(HOVERED_INTERSECTED.objectColor)
      }

      HOVERED_INTERSECTED.object = intersected;
      HOVERED_INTERSECTED.objectColor = HOVERED_INTERSECTED.object.material.color.getStyle();
      HOVERED_INTERSECTED.object.material.color.setStyle(COLOR.DOT_HOVERED);
    } else {
      if (HOVERED_INTERSECTED.object) {
        console.log(HOVERED_INTERSECTED.objectColor);

        HOVERED_INTERSECTED.object.material.color.setStyle(HOVERED_INTERSECTED.objectColor);
        HOVERED_INTERSECTED.object = null
        HOVERED_INTERSECTED.objectColor = null

      }
    }
  }
}
