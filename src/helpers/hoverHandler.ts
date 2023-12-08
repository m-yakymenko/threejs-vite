import * as THREE from 'three'
import { world } from 'src/singleton'
import { throttle } from 'throttle-debounce'
import { DotType, ReactiveDot } from 'src/forms/ReactiveDot'
import { LineType, ReactiveLine } from 'src/forms/ReactiveLine'

export const HOVERED_INTERSECTED = {
  object: null as ReactiveDot | ReactiveLine | null,
  objectType: null as LineType | DotType | null,
}

export const hoverHandler = () => {
  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()

  const onPointerMove = throttle(100, (event: MouseEvent) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1
    window.requestAnimationFrame(render)
  }, { noLeading: false, noTrailing: false }
  )

  window.addEventListener('pointermove', onPointerMove)

  const render = () => {
    raycaster.setFromCamera(pointer, world.camera)
    const intersected = raycaster.intersectObjects(world.dotsGroup.children, false)[0]?.object as ReactiveDot | ReactiveLine | undefined

    if (intersected) {
      if (HOVERED_INTERSECTED.object) {
        HOVERED_INTERSECTED.object.proxy.type = HOVERED_INTERSECTED.objectType!
      }

      HOVERED_INTERSECTED.object = intersected
      HOVERED_INTERSECTED.objectType = HOVERED_INTERSECTED.object.proxy.type
      HOVERED_INTERSECTED.object.proxy.type = 'hovered'
    } else {
      if (HOVERED_INTERSECTED.object) {
        HOVERED_INTERSECTED.object.proxy.type = HOVERED_INTERSECTED.objectType!

        HOVERED_INTERSECTED.object = null
        HOVERED_INTERSECTED.objectType = null

      }
    }
  }
}
