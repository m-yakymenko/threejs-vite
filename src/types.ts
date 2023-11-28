export interface TypedGroupType<T extends THREE.Object3D = THREE.Object3D> extends THREE.Group {
  children: T[];
  add: (...objects: T[]) => this;
}

export type EdgeArrayType = Array<{
  dot: THREE.Mesh,
  line: THREE.Line,
}>
export type MapType = { [key: number]: EdgeArrayType }
