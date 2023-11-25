import * as THREE from 'three'
import { camera, render, scene, stats } from '../singleton'
import { HOVERED_INTERSECTED } from '../hoverHandler'
import { MESH_ELEMENTS_TYPE } from '../constans'

export const createCube = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1,)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  function animate() {
    requestAnimationFrame(animate)
    stats.begin()

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    stats.end()
  }

  animate()

  return cube
}

export const createLines = (points: THREE.Vector3[]) => {
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff })

  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const line = new THREE.LineSegments(geometry, material)
  scene.add(line)

  return line
}

export const createDot = (position?: THREE.Vector3) => {
  const geometry = new THREE.SphereGeometry(0.1);
  const material = new THREE.MeshBasicMaterial({ color: 'green' });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.copy(position || new THREE.Vector3().copy(camera.position).setZ(0));
  scene.add(sphere);

  return scene;
}

export const createBasicDots = () => {
  [
    [-2, 1, 0],
    [1, 2, 0],
    [2, 3, 0],
  ].forEach(coord => createDot(new THREE.Vector3(...coord)))
}

export const createDotsConnector = () => {
  const dots = {
    start: null as THREE.Mesh | null,
    end: null as THREE.Mesh | null,
  }
  const dict = new Set<string>()

  const destroy = () => {
    dots.start = null
    dots.end = null
  }

  window.addEventListener('click', () => {
    const selectedObject = HOVERED_INTERSECTED.object

    if (selectedObject) {
      if (!MESH_ELEMENTS_TYPE.includes(selectedObject.type)) return;
      if (dots.start && selectedObject !== dots.start) {
        dots.end = selectedObject

        const hashStart = dots.start.position.toArray().toString()
        const hashEnd = dots.end.position.toArray().toString()

        if (dict.has(hashStart + hashEnd)) return;
        dict.add(hashStart + hashEnd)

        createLines([
          dots.start.position,
          dots.end.position,
        ])
        render()
        destroy()
      } else {
        dots.start = selectedObject
      }
    } else {
      destroy()
    }
  })
}
