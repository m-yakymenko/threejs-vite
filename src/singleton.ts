import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'


export const scene = new THREE.Scene()
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
export const renderer = new THREE.WebGLRenderer({ antialias: true })

export const stats = new Stats()

export const composer = new EffectComposer(renderer)
export const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass)

export const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 0, 0)

console.log('init')

export const render = () => {
  controls.update()
  composer.render()
  window.requestAnimationFrame(render)
}
window.requestAnimationFrame(render)
