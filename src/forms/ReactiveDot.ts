import * as THREE from 'three'
import { COLOR } from '../constans';

export type DotType =
  'dot' |
  'startDot' |
  'hovered' |
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
  'endDot': COLOR.DOT_END,
  'pathToEnd': COLOR.SUCCESS,
} as const

export class ReactiveDot extends THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> {
  public proxy: ProxyInterface;

  constructor(geometry: THREE.SphereGeometry, material: THREE.MeshStandardMaterial) {
    super(geometry, material)
    this.proxy = this._getBaseProxy(this)
  }

  private _getBaseProxy(mesh: ReactiveDot) {
    return new Proxy<ProxyInterface>({
      _mesh: mesh,
      type: 'dot',
    }, {
      set(obj, key, newValue) {
        switch (true) {
          case key === 'type':
            obj._mesh.material.color.setStyle(DotsColor[newValue as DotType]);
            break;
        }
        return Reflect.set(obj, key, newValue)
      },
    })
  }
}
