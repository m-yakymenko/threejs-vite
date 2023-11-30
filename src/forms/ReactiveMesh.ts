import * as THREE from 'three'

type MeshGeometry = THREE.SphereGeometry | THREE.BufferGeometry
type MeshMaterial = THREE.MeshStandardMaterial | THREE.LineBasicMaterial
type BaseClassTypes = THREE.Line | THREE.Mesh


export const reactiveMeshBuilder = <
  BaseClasType extends BaseClassTypes = BaseClassTypes,
  G extends MeshGeometry = MeshGeometry,
  M extends MeshMaterial = MeshMaterial,
  DotType extends string = string,
>(
  BaseClass: { new(geometry?: G, material?: M): BaseClasType extends infer R ? R : BaseClasType },
  DotsColor: { [key: string]: string },
  initType: DotType,
) => {
  interface ProxyInterface {
    _mesh: ReactiveMesh;
    type: DotType;
  }

  class ReactiveMesh extends BaseClass {
    public proxy: ProxyInterface;

    constructor(geometry: G, material: M) {
      super(geometry, material)
      this.proxy = this._getBaseProxy(this)
    }

    private _getBaseProxy(mesh: ReactiveMesh) {
      return new Proxy<ProxyInterface>({
        _mesh: mesh,
        type: initType,
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

  return ReactiveMesh
}
