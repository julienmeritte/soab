import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import {useLoader} from "react-three-fiber";
import {OrbitControls, useTexture} from "@react-three/drei";
import timeBombBackCard from '../../assets/images/mtg-back.png';

function Card(props) {

    /***
     * ENFANT utile une ref de lui-même pour s'automodifier.
     * On fait écouter la ref sur les props pour chopper des infos du parent en temps réel.
     */
    const backTexture = useTexture(timeBombBackCard);
    const ref = useRef();
    return (
        <mesh position={props.position} onClick={click} ref={ref}>
            <planeBufferGeometry attach="geometry" args={[props.properties.cardWidth, props.properties.cardHeight]}/>
            <meshBasicMaterial attach="material" map={backTexture}/>
        </mesh>
    );

    function click(e) {
        e.stopPropagation();
        props.cardClick(props.index);
        ref.current.position.y = props.position[1];
        console.log(props.card)
    }
}

export default Card;
