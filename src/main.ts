import './assets/style.css'

import { addLight, addPlane, createScene, } from './camera/scene.ts'
import { makeObjDraggable } from './forms/dragAndDrop.ts'
import { hoverHandler } from './helpers/hoverHandler.ts'
import { addGridHelper } from './camera/gridHelper.ts'
import { turnOnDotsConnectorMode } from './helpers/turnOnDotsConnectorMode.ts'
import { createRandomDotsAndLines } from './helpers.ts'

const init = () => {
  createScene()
  addLight()
  addPlane()
  addGridHelper()

  hoverHandler()
  makeObjDraggable()

  createRandomDotsAndLines()
  turnOnDotsConnectorMode()
}

init()
