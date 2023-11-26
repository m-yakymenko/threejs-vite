
import { camera, renderer, stats } from './singleton'


export function createScene() {
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  renderer.domElement.appendChild(stats.dom)
  camera.position.x = 5.1289497578978755
  camera.position.y = 15
  camera.position.z = 7
  //camera.rotation.x = 0.06463453868995843
  //camera.rotation.y = 0.0646841888779492
  //camera.rotation.z = -0.004183721104761262

  window.addEventListener("resize", () => {
    const width = window.innerWidth
    const height = window.innerHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
  })
}





