import 'reset-css'
import './style.css'
import { addOrbitControls, createScene, } from './scene.ts'
import { createCube, createLines } from './forms/forms.ts'
import { makeObjDraggable } from './dragAndDrop.ts'


const init = () => {
  createScene()
  const orbitControl = addOrbitControls()

  const cube = createCube()
  const line = createLines()

  makeObjDraggable([cube, line], orbitControl)
}

init()
