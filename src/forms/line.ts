import * as THREE from 'three'
import { COLOR } from '../constans'
import { dotsGroup, linesGroup } from '../singleton'
import { randomIntFromInterval } from '../utils'
import { addLineHelper } from '../helpers/linesHelper'
import { ReactiveLine } from './ReactiveLine'

//const colors = new Float32Array([
//  1.0, 0.0, 0.0,  // red (normalized)
//  0.0, 1.0, 0.0   // green (normalized)
//])

export const createLines = (points: THREE.Vector3[]) => {
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
  //lineGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  const lineMaterial = new THREE.LineBasicMaterial({
    color: COLOR.LINE,
    linewidth: 5, // in pixels
    //vertexColors: true,
  })
  const line = new ReactiveLine(lineGeometry, lineMaterial)
  line.castShadow = true
  linesGroup.add(line)
  return line
}


export const createBasicLines = () => {
  const dots = dotsGroup.children

  for (let index = 0; index < dotsGroup.children.length * 3; index++) {
    const [dotStart, dotEnd] = [dots[randomIntFromInterval(0, dots.length - 1)], dots[randomIntFromInterval(0, dots.length - 1)]]

    addLineHelper(dotStart, dotEnd)
  }
}
