import { world } from './../singleton';
import { GridHelper, AxesHelper } from 'three'

export const addGridHelper = () => {
  world.scene.add(new GridHelper(50, 50, 0x888888, 0x444444))
  world.scene.add(new AxesHelper(25).setColors('red', 'blue', 'green'))
}

