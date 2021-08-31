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

    const [shouldRotate, setShouldRotate] = useState(props.shouldRotate);
    const [rotateState, setRotateState] = useState(props.rotateState);
    const [zAxis, setZAxis] = useState(props.position[2]);

    useFrame(() => {
        if (props.position[2] === -12) {
            setShouldRotate(true);
            props.position[2] = zAxis;
        }
        updateSelf();
        animationRotateSelf180();
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
        //rotateSelf180();
        //setShouldRotate(true);
    }

    function updateSelf() {
        ref.current.position.x = props.position[0];
        ref.current.position.y = props.position[1];
        ref.current.position.z = props.position[2];
    }

    function rotateSelf180() {
        if (ref.current.rotation.y === 0) {
            ref.current.rotation.y += Math.PI;
        } else {
            ref.current.rotation.y = 0;
        }
    }

    function animationRotateSelf180() {
        if (shouldRotate) {
            if (rotateState === 0) {
                if (ref.current.rotation.y === 0) {
                    setZAxis(props.position[2]);
                }
                if (ref.current.rotation.y < Math.PI) {
                    if (ref.current.rotation.y < Math.PI / 2) {
                        props.position[2] += 0.5;
                    } else {
                        props.position[2] -= 0.5;
                    }
                    ref.current.rotation.y += 0.05;
                } else {
                    ref.current.rotation.y = Math.PI;
                    props.position[2] = zAxis;
                    setShouldRotate(false);
                    setRotateState(1)
                }
            } else if (rotateState === 1) {
                if (ref.current.rotation.y === Math.PI) {
                    setZAxis(props.position[2]);
                }
                if (ref.current.rotation.y > 0) {
                    if (ref.current.rotation.y > Math.PI / 2) {
                        props.position[2] += 0.5;
                    } else {
                        props.position[2] -= 0.5;
                    }
                    ref.current.rotation.y -= 0.05;
                } else {
                    ref.current.rotation.y = 0;
                    props.position[2] = zAxis;
                    setShouldRotate(false);
                    setRotateState(0)
                }
            }
        }
    }
}

export default Card;
