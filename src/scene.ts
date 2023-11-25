import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { camera, composer, renderer, stats } from './singleton'


export function createScene() {
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  renderer.domElement.appendChild(stats.dom)
  camera.position.z = 5

  window.addEventListener("resize", () => {
    const width = window.innerWidth
    const height = window.innerHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
    composer.setSize(width, height)

  })
}

export const addOrbitControls = () => {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.update()

  return controls
}






