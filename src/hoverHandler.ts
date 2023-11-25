import * as THREE from 'three';
import { camera, scene } from './singleton';

export const hoverHandler = () => {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  const INTERSECTED = {
    object: null as THREE.Mesh | null,
    currentHex: null as any | null,
  }

  const onPointerMove = (event: any) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
  }
  window.addEventListener('pointermove', onPointerMove);

  const render = () => {
    window.requestAnimationFrame(render)
    raycaster.setFromCamera(pointer, camera);
    const intersected = raycaster.intersectObjects(scene.children.filter(({ type }) => type !== 'GridHelper'), false)[0];
    if (intersected) {
      if (INTERSECTED.object) (INTERSECTED.object.material as THREE.MeshBasicMaterial).color.setHex(INTERSECTED.currentHex);

      INTERSECTED.object = intersected.object as THREE.Mesh;
      INTERSECTED.currentHex = (INTERSECTED.object.material as THREE.MeshBasicMaterial).color.getHex();
      (INTERSECTED.object.material as THREE.MeshBasicMaterial).color.setHex(0xff0000);
    } else {
      if (INTERSECTED.object) {
        (INTERSECTED.object.material as THREE.MeshBasicMaterial).color.setHex(INTERSECTED.currentHex);
        INTERSECTED.object = null;
        INTERSECTED.currentHex = null;
      }
    }
  }

  window.requestAnimationFrame(render);
}
