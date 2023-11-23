import * as THREE from 'three';
import { camera, render, scene, stats } from '../singleton';

export const createCube = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1,);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    stats.begin();

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    render()

    stats.end();
  }

  animate()

  return cube
}

export const createLines = () => {
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

  const points = [];
  points.push(new THREE.Vector3(- 1, 0, 0));
  points.push(new THREE.Vector3(0, 1, 0));
  points.push(new THREE.Vector3(1, 0, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  scene.add(line);

  return line
}
