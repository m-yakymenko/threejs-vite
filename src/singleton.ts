import { Scene, PerspectiveCamera, WebGLRenderer, Group } from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { GROUP_DOTS_NAME, GROUP_LINES_NAME } from './constans'
import { TypedGroupType } from './types'
import { ReactiveDot } from './forms/ReactiveDot'
import { ReactiveLine } from './forms/ReactiveLine'
import { GraphManager } from './forms/GraphManager'


class World {
  scene: Scene
  camera: PerspectiveCamera


  constructor() {
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10000)
  }
}

export const world = new World()



export const renderer = new WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true

export const stats = new Stats()

export const controls = new OrbitControls(world.camera, renderer.domElement)

export const linesGroup = new Group() as TypedGroupType<ReactiveLine>
linesGroup.name = GROUP_LINES_NAME
world.scene.add(linesGroup)


export const dotsGroup = new Group() as TypedGroupType<ReactiveDot>
dotsGroup.name = GROUP_DOTS_NAME
world.scene.add(dotsGroup)

console.log('init')

export const render = () => {
  controls.update()
  renderer.render(world.scene, world.camera)
}

const renderLoop = () => {
  render()
  window.requestAnimationFrame(renderLoop)
}

window.requestAnimationFrame(renderLoop)

export const graphManager = new GraphManager()


