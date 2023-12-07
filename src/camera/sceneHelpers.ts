import { world } from '../singleton';
import { AmbientLight, SpotLight, PlaneGeometry, ShadowMaterial, Mesh } from 'three'


export const addLight = () => {
  world.scene.add(new AmbientLight(0xf0f0f0, 3))
  const light = new SpotLight(0xffffff, 4.5)
  light.position.set(0, 1000, -200)
  light.angle = Math.PI * 0.01
  light.decay = 0
  light.castShadow = true
  light.shadow.camera.near = 200
  light.shadow.camera.far = 2000
  light.shadow.bias = - 0.000222
  light.shadow.mapSize.width = 10000
  light.shadow.mapSize.height = 10000
  world.scene.add(light)
}

export const addPlane = () => {
  const planeGeometry = new PlaneGeometry(2000, 2000)
  planeGeometry.rotateX(- Math.PI / 2)
  const planeMaterial = new ShadowMaterial({ color: 'grey', opacity: 0.5 })

  const plane = new Mesh(planeGeometry, planeMaterial)
  plane.position.y = 0
  plane.receiveShadow = true
  world.scene.add(plane)
}
