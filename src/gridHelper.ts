import * as THREE from 'three'
import { scene } from "./singleton"

export const addGridHelper = () => {
  scene.add(new THREE.GridHelper(50, 100, 0x888888, 0x444444))
}
