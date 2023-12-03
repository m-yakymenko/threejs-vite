import { Mesh, type SphereGeometry, type MeshStandardMaterial } from 'three'
import { COLOR } from '../constans'
import { getBaseProxyHelper } from './ReactiveMesh'

export type DotType =
  'dot' |
  'startDot' |
  'hovered' |
  'selected' |
  'endDot' |
  'pathToEnd'

interface ProxyInterface {
  _mesh: ReactiveDot,
  type: DotType,
}

const DotsColor: { [key in DotType]: string } = {
  'dot': COLOR.DOT,
  'startDot': COLOR.DOT_START,
  'hovered': COLOR.DOT_HOVERED,
  'selected': COLOR.DOT_SELECTED,
  'endDot': COLOR.DOT_END,
  'pathToEnd': COLOR.SUCCESS,
} as const

export class ReactiveDot extends Mesh<SphereGeometry, MeshStandardMaterial> {
  public proxy: ProxyInterface

  constructor(geometry: SphereGeometry, material: MeshStandardMaterial) {
    super(geometry, material)
    this.proxy = getBaseProxyHelper<ProxyInterface>(this, DotsColor, 'dot')
  }
}
