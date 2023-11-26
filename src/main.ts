import 'reset-css'
import './style.css'
import { createScene, } from './camera/scene.ts'
import { createBasicDots, } from './forms/forms.ts'
import { makeObjDraggable } from './forms/dragAndDrop.ts'
import { hoverHandler } from './forms/hoverHandler.ts'
import { addGridHelper } from './forms/gridHelper.ts'
import { createGui } from './gui.ts'
import { createDotsConnector } from './forms/dotsConnector.ts'


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
