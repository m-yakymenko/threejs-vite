import * as THREE from 'three'
import { COLOR } from '../constans';
import { getBaseProxyHelper } from './ReactiveMesh';

export type DotType =
  'dot' |
  'startDot' |
  'hovered' |
  'selected' |
  'endDot' |
  'pathToEnd';
interface ProxyInterface {
  _mesh: ReactiveDot;
  type: DotType;
}
const DotsColor: { [key in DotType]: string } = {
  'dot': COLOR.DOT,
  'startDot': COLOR.DOT_START,
  'hovered': COLOR.DOT_HOVERED,
  'selected': COLOR.DOT_SELECTED,
  'endDot': COLOR.DOT_END,
  'pathToEnd': COLOR.SUCCESS,
} as const

export class ReactiveDot extends THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> {
  public proxy: ProxyInterface;

  constructor(geometry: THREE.SphereGeometry, material: THREE.MeshStandardMaterial) {
    super(geometry, material)
    this.proxy = getBaseProxyHelper<ReactiveDot, DotType>(this, DotsColor)
  }
}

//ReactiveDot.prototype.proxy.type = ''
