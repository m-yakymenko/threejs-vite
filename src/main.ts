import 'reset-css'
import './assets/style.css'

import { addLight, addPlane, createScene, } from './camera/scene.ts'
import { createBasicDots, } from './forms/forms.ts'
import { makeObjDraggable } from './forms/dragAndDrop.ts'
import { hoverHandler } from './forms/hoverHandler.ts'
import { addGridHelper } from './camera/gridHelper.ts'
import { createGui } from './gui.ts'
import { createDotsConnector } from './forms/dotsConnector.ts'
import { findPathByDijkstraAlgorithm } from './algoritms/dijkstra.ts'



const init = () => {
  createScene()
  addLight()
  addPlane()
  addGridHelper()
  createGui()

  hoverHandler()
  makeObjDraggable()

  createBasicDots()
  createDotsConnector()
  //findPathByDijkstraAlgorithm()
}

init()
