import { Line, type BufferGeometry, type LineBasicMaterial, } from 'three'
import { COLOR } from '../constans'
import { getBaseProxyHelper } from './ReactiveMesh'

export type LineType =
  'line' |
  'hovered' |
  'pathToEnd' |
  'pathChecked'

interface ProxyInterface {
  _mesh: ReactiveLine,
  type: LineType,
}
const LinesColor: { [key in LineType]: string } = {
  'line': COLOR.LINE,
  'hovered': COLOR.DOT_HOVERED,
  'pathToEnd': COLOR.SUCCESS,
  'pathChecked': COLOR.LINE_CHECKED,
} as const

export class ReactiveLine extends Line<BufferGeometry, LineBasicMaterial> {
  public proxy: ProxyInterface

  constructor(geometry: BufferGeometry, material: LineBasicMaterial) {
    super(geometry, material)
    this.proxy = getBaseProxyHelper<ProxyInterface>(this, LinesColor, 'line')
  }
}
