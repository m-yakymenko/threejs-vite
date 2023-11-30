import { ReactiveDot } from "./forms/ReactiveDot";

export interface TypedGroupType<T extends THREE.Object3D = THREE.Object3D> extends THREE.Group {
  children: T[];
  add: (...objects: T[]) => this;
}

export type ThreeLineType = THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>

export type EdgeArrayType = Array<{
  dot: ReactiveDot,
  line: ThreeLineType,
}>
export type MapType = { [key: number]: EdgeArrayType }


