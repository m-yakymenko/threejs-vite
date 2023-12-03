import { type Object3D, type Group } from 'three'

export interface TypedGroupType<T extends Object3D = Object3D> extends Group {
  children: T[],
  add: (...objects: T[]) => this,
}




