import { Scene, PerspectiveCamera, WebGLRenderer, Group } from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { GROUP_DOTS_NAME, GROUP_LINES_NAME } from './constans'
import { TypedGroupType } from './types'
import { ReactiveDot } from './forms/ReactiveDot'
import { ReactiveLine } from './forms/ReactiveLine'
import { GraphManager } from './forms/GraphManager'


export const world = new class World {
  scene: Scene
  camera: PerspectiveCamera
  renderer: WebGLRenderer
  stats: Stats
  controls: OrbitControls
  linesGroup: TypedGroupType<ReactiveLine>
  dotsGroup: TypedGroupType<ReactiveDot>


  constructor() {
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10000)
    this.renderer = this.initRenderer()
    this.stats = new Stats()
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.linesGroup = this.initGroup<TypedGroupType<ReactiveLine>>(GROUP_LINES_NAME)
    this.dotsGroup = this.initGroup<TypedGroupType<ReactiveDot>>(GROUP_DOTS_NAME)

    this.renderer.setAnimationLoop(this.renderLoop.bind(this))
    console.log('init')
  }

  private initRenderer() {
    const renderer = new WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    return renderer
  }

  private initGroup<T extends Group>(groupName: string) {
    const group = new Group() as T
    group.name = groupName
    this.scene.add(group)
    return group
  }

  render() {
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  renderLoop = () => {
    this.render()
    this.renderer.setAnimationLoop(this.renderLoop.bind(this))
  }
}

export const graphManager = new GraphManager()
