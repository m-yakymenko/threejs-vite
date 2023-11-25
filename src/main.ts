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

  createCube()
  createLines()

  hoverHandler()
  makeObjDraggable(orbitControl)
}

init()
