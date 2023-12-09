import { world } from 'src/singleton'
import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  TextureLoader,
} from 'three'

import TextureUrl from 'src/assets/textures/uv-test-bw.png'



export const createCube = () => {
  const geometry = new BoxGeometry(2, 2, 2)

  const textureLoader = new TextureLoader()
  const texture = textureLoader.load(TextureUrl)

  const material = new MeshStandardMaterial({
    color: 'purple',
    map: texture,
  })

  const cube = new Mesh(geometry, material)
  world.scene.add(cube)

  return cube
}
