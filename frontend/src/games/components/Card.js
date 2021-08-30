import React, {useEffect, useRef, useState} from "react";
import {useTexture} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";


function Card(props) {

    /***
     * ENFANT utilise une ref de lui-même pour s'automodifier.
     * On fait écouter la ref sur les props pour chopper des infos du parent en temps réel.
     */
    const backTexture = useTexture(props.texture[0]);
    const frontTexture = useTexture(props.texture[1]);
    const ref = useRef();

    useFrame(() => {
        updateSelf();
    });

    return (
        <mesh position={props.position} onClick={click} ref={ref}>
            <boxBufferGeometry attach="geometry"
                               args={[props.properties.cardWidth, props.properties.cardHeight, 0.04]}/>
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
        rotateSelf180();
    }

    function updateSelf() {
        ref.current.position.x = props.position[0];
        ref.current.position.y = props.position[1];
        ref.current.position.z = props.position[2];
    }

    function rotateSelf180() {
        ref.current.rotation.y += Math.PI;
    }
}

export default Card;
