import 'reset-css'
import './style.css'
import { createScene, } from './scene.ts'
import { createBasicDots, createDotsConnector, } from './forms/forms.ts'
import { makeObjDraggable } from './dragAndDrop.ts'
import { hoverHandler } from './hoverHandler.ts'
import { addGridHelper } from './gridHelper.ts'
import { createGui } from './gui.ts'


const init = () => {
  createScene()
  addGridHelper()
  createGui()

  createBasicDots()
  hoverHandler()
  makeObjDraggable()

  createDotsConnector()
}

init()
