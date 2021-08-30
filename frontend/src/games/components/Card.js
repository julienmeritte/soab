import * as THREE from "three";
import React, {useEffect, useRef, useState} from "react";
import {useLoader} from "react-three-fiber";
import {OrbitControls, useTexture} from "@react-three/drei";
import {TextureLoader} from "three";

//import timeBombBackCard from '../../assets/images/mtg-back.png';

function Card(props) {

    /***
     * ENFANT utilise une ref de lui-même pour s'automodifier.
     * On fait écouter la ref sur les props pour chopper des infos du parent en temps réel.
     */
    const backTexture = useTexture(props.texture[0]);
    const frontTexture = useTexture(props.texture[1]);
    const ref = useRef();
    return (
        <mesh position={props.position} onClick={click} ref={ref}>
            <boxBufferGeometry attach="geometry" args={[props.properties.cardWidth, props.properties.cardHeight, 0.04]}/>
            <meshStandardMaterial attachArray="material" map={backTexture}/>
            <meshStandardMaterial attachArray="material" map={backTexture}/>
            <meshStandardMaterial attachArray="material" map={backTexture}/>
            <meshStandardMaterial attachArray="material" map={backTexture}/>
            <meshStandardMaterial attachArray="material" map={backTexture}/>
            <meshStandardMaterial attachArray="material" map={frontTexture}/>
        </mesh>
    );

    function click(e) {
        e.stopPropagation();
        props.cardClick(props.index);
        ref.current.position.y = props.position[1];
        ref.current.rotation.y += Math.PI;
        console.log(props.card)
    }
}

export default Card;
