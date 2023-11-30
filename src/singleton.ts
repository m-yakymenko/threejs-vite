import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { GROUP_DOTS_NAME, GROUP_LINES_NAME } from './constans'
import { MapType, ThreeLineType, TypedGroupType } from './types'
import { ReactiveDot } from './forms/ReactiveDot'


export const scene = new THREE.Scene()
//scene.background = new THREE.Color('white')

export const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10000)
export const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

export const stats = new Stats()

export const controls = new OrbitControls(camera, renderer.domElement)

export const linesGroup = new THREE.Group() as TypedGroupType<ThreeLineType>;
linesGroup.name = GROUP_LINES_NAME
scene.add(linesGroup);


export const dotsGroup = new THREE.Group() as TypedGroupType<ReactiveDot>;
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


