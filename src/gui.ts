//import * as THREE from 'three'
import { createDot } from './forms/forms';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

export const createGui = () => {
  const params = {
    ['Add point']: createDot,
  };

  const gui = new GUI();
  gui.add(params, 'Add point');
}
