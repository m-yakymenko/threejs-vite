import * as THREE from 'three'
import { COLOR } from '../constans';
import { getBaseProxyHelper } from './ReactiveMesh';

export type LineType =
  'line' |
  'hovered' |
  'pathToEnd' |
  'pathChecked'
  ;
interface ProxyInterface {
  _mesh: ReactiveLine;
  type: LineType;
}
const LinesColor: { [key in LineType]: string } = {
  'line': COLOR.LINE,
  'hovered': COLOR.DOT_HOVERED,
  'pathToEnd': COLOR.SUCCESS,
  'pathChecked': COLOR.LINE_CHECKED,
} as const

export class ReactiveLine extends THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial> {
  public proxy: ProxyInterface;

  constructor(geometry: THREE.BufferGeometry, material: THREE.LineBasicMaterial) {
    super(geometry, material)
    this.proxy = getBaseProxyHelper<ProxyInterface>(this, LinesColor, 'line')
  }
}
