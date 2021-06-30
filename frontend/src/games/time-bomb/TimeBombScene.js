import * as THREE from "three";
import Card from "../Card";
import Board from "../Board";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";

export default function TimeBombScene() {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle="0.3" />
      <Board />
      <Card />
    </Canvas>
  );
}

/*const scene = new THREE.Scene();

// Objects
const card = Card();
scene.add(card);

// Lights
const ambientLights = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLights);

const dirLights = new THREE.DirectionalLight(0xffffff, 0.6);
dirLights.position.set(100, -300, 400);
scene.add(dirLights);

// Camera
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera(
  cameraWidth / -2, // left
  cameraWidth / 2, // right
  cameraWidth / 2, // top
  cameraWidth / -2, // bottom
  0, // near plane
  1000 // far plane
);

camera.position.set(200, -200, 300);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);*/
