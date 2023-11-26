import * as THREE from 'three';

export class TypedGroup<T extends THREE.Object3D = THREE.Object3D> extends THREE.Group {
  declare children: T[];

  add(...objects: T[]): this {
    return super.add(...objects);
  }
}
