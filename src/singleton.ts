import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { GROUP_DOTS_NAME, GROUP_LINES_NAME } from './constans'
import { MapType, TypedGroupType } from './types'
import DAT_GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { getSetStartEndDotsEvent, } from './events'


export const scene = new THREE.Scene()
//scene.background = new THREE.Color('white')

export const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10000)
export const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

export const stats = new Stats()

export const controls = new OrbitControls(camera, renderer.domElement)

export const linesGroup = new THREE.Group() as TypedGroupType<THREE.Line>;
linesGroup.name = GROUP_LINES_NAME
scene.add(linesGroup);


export const dotsGroup = new THREE.Group() as TypedGroupType<THREE.Mesh>;
dotsGroup.name = GROUP_DOTS_NAME
scene.add(dotsGroup);

console.log('init')

export const render = () => {
  controls.update()
  renderer.render(scene, camera)

  window.requestAnimationFrame(render)
}
window.requestAnimationFrame(render)


export const graph: MapType = {}
export const GUI = new DAT_GUI();

class State {
  private _selectingStartEnd: boolean

  constructor() {
    this._selectingStartEnd = false
  }

  public set selectingStartEnd(state: boolean) {
    this._selectingStartEnd !== state && window.dispatchEvent(getSetStartEndDotsEvent(state))
    this._selectingStartEnd = state
  }

  public get selectingStartEnd() {
    return this._selectingStartEnd
  }
}

export const state = new State()
