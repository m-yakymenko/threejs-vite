import { type Mesh, type SphereGeometry, type MeshStandardMaterial, type Line, type BufferGeometry, type LineBasicMaterial } from 'three'

interface ProxyInterface {
  _mesh: Mesh<SphereGeometry, MeshStandardMaterial> | Line<BufferGeometry, LineBasicMaterial>,
  type: string,
}

export const getBaseProxyHelper = <M extends ProxyInterface>(
  mesh: M['_mesh'],
  DotsColor: { [key in M['type']]: string },
  initType: M['type']
) =>
  new Proxy({
    _mesh: mesh,
    type: initType,
  }, {
    set(obj, key, newValue) {
      switch (true) {
        case key === 'type':
          obj._mesh.material.color.setStyle(DotsColor[newValue as M['type']])
          break;
      }
      return Reflect.set(obj, key, newValue)
    },
  })

