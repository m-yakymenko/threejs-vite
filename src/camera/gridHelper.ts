import * as THREE from 'three'
import { scene } from "../singleton"

export const addGridHelper = () => {
  scene.add(new THREE.GridHelper(50, 50, 0x888888, 0x444444))
  scene.add(new THREE.AxesHelper(25).setColors('red', 'blue', 'green'))
}

