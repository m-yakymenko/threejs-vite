import { type Vector3, BufferGeometry, LineBasicMaterial } from 'three'
import { COLOR } from 'src/constans'
import { randomIntFromInterval } from 'src/utils'
import { ReactiveLine } from 'src/forms/ReactiveLine'
import { graphManager, world } from 'src/singleton'

//const colors = new Float32Array([
//  1.0, 1.0, 0.0,  // yellow (normalized)
//  0.0, 0.0, 1.0   // blue (normalized)
//])

export const createLines = (points: Vector3[]) => {
  const lineGeometry = new BufferGeometry().setFromPoints(points)
  const lineMaterial = new LineBasicMaterial({
    color: COLOR.LINE,
    linewidth: 1, // in pixels
    //vertexColors: true,
  })
  //lineGeometry.setAttribute('color', new BufferAttribute(colors, 3))
  const line = new ReactiveLine(lineGeometry, lineMaterial)
  line.castShadow = true
  world.linesGroup.add(line)
  return line
}


export const createBasicLines = () => {
  const dots = world.dotsGroup.children

  for (let index = 0; index < world.dotsGroup.children.length * 3; index++) {
    const [dotStart, dotEnd] = [dots[randomIntFromInterval(0, dots.length - 1)], dots[randomIntFromInterval(0, dots.length - 1)]]

    graphManager.addLine(dotStart, dotEnd)
  }
}
