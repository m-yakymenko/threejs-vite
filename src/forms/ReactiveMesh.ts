
export type DotType =
  'dot' |
  'hovered' |
  'selected';

export const getBaseProxyHelper = <M extends THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>, D extends string>(mesh: M, DotsColor: { [key in D]: string }) =>
  new Proxy({
    _mesh: mesh as M,
    type: 'dot' as D,
  }, {
    set(obj, key, newValue) {
      switch (true) {
        case key === 'type':
          obj._mesh.material.color.setStyle(DotsColor[newValue as D]);
          break;
      }
      return Reflect.set(obj, key, newValue)
    },
  })

