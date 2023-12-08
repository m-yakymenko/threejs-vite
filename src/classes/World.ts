import { Scene, PerspectiveCamera, WebGLRenderer, Group } from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { TypedGroupType } from 'src/types'
import { ReactiveLine } from 'src/forms/ReactiveLine'
import { ReactiveDot } from 'src/forms/ReactiveDot'
import { GROUP_DOTS_NAME, GROUP_LINES_NAME } from 'src/constans'
import { getCanvasBox } from 'src/helpers'


export class World {
  readonly scene: Scene
  readonly camera: PerspectiveCamera
  readonly renderer: WebGLRenderer
  readonly stats: Stats
  readonly controls: OrbitControls
  readonly linesGroup: TypedGroupType<ReactiveLine>
  readonly dotsGroup: TypedGroupType<ReactiveDot>


  constructor() {
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10000)
    this.renderer = this.initRenderer()
    this.stats = new Stats()
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.linesGroup = this.initGroup<TypedGroupType<ReactiveLine>>(GROUP_LINES_NAME)
    this.dotsGroup = this.initGroup<TypedGroupType<ReactiveDot>>(GROUP_DOTS_NAME)

    this.renderer.setAnimationLoop(this.render.bind(this))
    this.createScene()
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

  private createScene() {
    const this_ = this

    this_.renderer.setSize(window.innerWidth, window.innerHeight)
    queueMicrotask(() => getCanvasBox().appendChild(this_.renderer.domElement))
    this_.renderer.domElement.appendChild(this_.stats.dom)

    window.addEventListener("resize", () => {
      const width = window.innerWidth
      const height = window.innerHeight

      this_.camera.aspect = width / height
      this_.camera.updateProjectionMatrix()

      this_.renderer.setSize(width, height)
      this_.renderer.setPixelRatio(window.devicePixelRatio)
    })
  }

  render() {
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }
}
