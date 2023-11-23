import 'reset-css'
import './style.css'
import { addOrbitControls, createCube, createLines, createScene, makeObjDraggable } from './scene.ts'


const init = () => {
  createScene()
  const orbitControl = addOrbitControls()
  const cube = createCube()
  makeObjDraggable([cube], orbitControl)
  createLines()
}

init()
