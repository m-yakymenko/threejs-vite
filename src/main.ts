import 'reset-css'
import './style.css'
import { addOrbitControls, createScene, } from './scene.ts'
import { createCube, createLines } from './forms/forms.ts'
import { makeObjDraggable } from './dragAndDrop.ts'
import { hoverHandler } from './hoverHandler.ts'
import { addGridHelper } from './gridHelper.ts'


const init = () => {
  createScene()
  addGridHelper()
  const orbitControl = addOrbitControls()

  const cube = createCube()
  const line = createLines()

  hoverHandler()
  //makeObjDraggable([cube, line], orbitControl)
}

init()
