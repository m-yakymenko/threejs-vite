import './assets/style.css'

import { addLight, addPlane, createScene, } from './camera/scene.ts'
import { makeObjDraggable } from './helpers/makeObjDraggable.ts'
import { hoverHandler } from './helpers/hoverHandler.ts'
import { addGridHelper } from './camera/gridHelper.ts'
import { createRandomDotsAndLines } from './helpers.ts'
import { findPathByDijkstraAlgorithm, setRandomDots } from './algoritms/dijkstra.ts'

const init = () => {
  createScene()
  addLight()
  addPlane()
  addGridHelper()

  hoverHandler()
  makeObjDraggable()

  createRandomDotsAndLines()

  setTimeout(() => {
    setRandomDots()
    findPathByDijkstraAlgorithm()
  }, 1500);
}

init()
