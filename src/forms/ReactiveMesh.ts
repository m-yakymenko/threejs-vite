
interface ProxyInterface {
  _mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> | THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;
  type: string;
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
          obj._mesh.material.color.setStyle(DotsColor[newValue as M['type']]);
          break;
      }
      return Reflect.set(obj, key, newValue)
    },
  })

