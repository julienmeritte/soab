import * as THREE from "three";
import React from "react";
import {useLoader} from "react-three-fiber";
import {OrbitControls, useTexture} from "@react-three/drei";
import timeBombBackCard from '../assets/images/mtg-back.png';

function Card() {
    const backTexture = useTexture(timeBombBackCard);
    return (
        <mesh position={[0, 0, 2]}>
            <planeBufferGeometry attach="geometry" args={[15, 23]}/>
            <meshBasicMaterial attach="material" map={backTexture}/>
        </mesh>
    );
}

export default Card;
