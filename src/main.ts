import './assets/style.css'

import { addLight, addPlane, createScene, } from './camera/scene.ts'
import { makeObjDraggable } from './forms/dragAndDrop.ts'
import { hoverHandler } from './forms/hoverHandler.ts'
import { addGridHelper } from './camera/gridHelper.ts'
import { createDotsConnector } from './forms/dotsConnector.ts'
import { createRandomDotsAndLines } from './helpers.ts'

const init = () => {
  createScene()
  addLight()
  addPlane()
  addGridHelper()

  hoverHandler()
  makeObjDraggable()

  createRandomDotsAndLines()
  createDotsConnector()
}

init()
