import * as THREE from 'three'
import { camera, render, scene, stats } from '../singleton'
import { HOVERED_INTERSECTED } from '../hoverHandler'
import { MESH_ELEMENTS_TYPE } from '../constans'
import { randomIntFromInterval } from '../utils'

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

const lineMaterial = new THREE.LineBasicMaterial({
  color: 'blue',
  linewidth: 5, // in pixels
  precision: 'lowp'
  //resolution:  // to be set by renderer, eventually 
})
export const createLines = (points: THREE.Vector3[]) => {
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
  const line = new THREE.Line(lineGeometry, lineMaterial)
  scene.add(line)
  return line
}

export const createDot = (position?: THREE.Vector3) => {
  const dotGeometry = new THREE.SphereGeometry(0.1);
  const dotMaterial = new THREE.MeshBasicMaterial({ color: 'green' });
  const sphere = new THREE.Mesh(dotGeometry, dotMaterial);
  sphere.position.copy(position || new THREE.Vector3().copy(camera.position).setZ(0));
  scene.add(sphere);

  return sphere;
}

export const createBasicDots = () => {
  const data = Array(20).fill([0, 0, 0]).map(() => [Math.random() * 10, Math.random() * 10, 0])
  data.forEach(coord => createDot(new THREE.Vector3(...coord)))
  //for (let index = 0; index < 60; index++) {
  //  createLines([new THREE.Vector3(...data[randomIntFromInterval(0, 19)]), new THREE.Vector3(...data[randomIntFromInterval(0, 19)])])
  //}
}

