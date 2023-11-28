//import * as THREE from 'three'
import { createDot } from './forms/forms';
import { clearAll, createDotsAndLines, selectStartEndDot } from './helpers';
import { findPathByDijkstraAlgorithm } from './algoritms/dijkstra';
import { GUI } from './singleton';
import { setStartEndDotsEventName } from './events';


export const createGui = () => {
  const params = {
    ['Clear']: clearAll,
    ['Add point']: createDot,
    ['Create dots & lines']: createDotsAndLines,
    ['Find path']: findPathByDijkstraAlgorithm,
    ['Select start end dots']: selectStartEndDot,
  };


  GUI.add(params, 'Clear');
  GUI.add(params, 'Add point');
  GUI.add(params, 'Create dots & lines');
  GUI.add(params, 'Find path');
  GUI.add(params, 'Select start end dots');

  window.addEventListener(setStartEndDotsEventName, (event) => {
    const { detail } = event as CustomEvent
    console.log(detail);
    if (detail) {

    }

  })
}
