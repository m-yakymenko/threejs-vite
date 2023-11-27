import 'reset-css'
import './assets/style.css'
import { addLight, addPlane, createScene, } from './camera/scene.ts'
import { createBasicDots, } from './forms/forms.ts'
import { makeObjDraggable } from './forms/dragAndDrop.ts'
import { hoverHandler } from './forms/hoverHandler.ts'
import { addGridHelper } from './camera/gridHelper.ts'
import { createGui } from './gui.ts'
import { createDotsConnector, findPathByDijkstraAlgorithm } from './forms/dotsConnector.ts'


const init = () => {
  createScene()
  addLight()
  addPlane()
  addGridHelper()
  createGui()

  createBasicDots()
  hoverHandler()
  makeObjDraggable()

  createDotsConnector()
  findPathByDijkstraAlgorithm()
}

init()
