import { ReactiveDot } from "./forms/ReactiveDot";
import { ReactiveLine } from "./forms/ReactiveLine";

export interface TypedGroupType<T extends THREE.Object3D = THREE.Object3D> extends THREE.Group {
  children: T[];
  add: (...objects: T[]) => this;
}

export type EdgeArrayType = Array<{
  dot: ReactiveDot,
  line: ReactiveLine,
}>
export type GraphType = { [key: number]: EdgeArrayType }


