import 'src/assets/style.css'

import { addLight, addPlane, } from 'src/camera/sceneHelpers.ts'
import { makeObjDraggable } from 'src/helpers/makeObjDraggable.ts'
import { hoverHandler } from 'src/helpers/hoverHandler.ts'
import { addGridHelper } from 'src/camera/gridHelper.ts'
import { createRandomDotsAndLines } from 'src/helpers.ts'
import { findPathByDijkstraAlgorithm, setRandomStartEndDots } from 'src/algoritms/dijkstra.ts'
//import { createCube } from 'src/forms/cube'

const init = () => {
  addLight()
  addPlane()
  addGridHelper()
  //createCube()

  hoverHandler()
  makeObjDraggable()

  createRandomDotsAndLines()

  setTimeout(() => {
    setRandomStartEndDots()
    findPathByDijkstraAlgorithm()
  }, 1500);
}

init()
