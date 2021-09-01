import React, {useState} from "react";
import {GAMES_ENUM} from "../../enums/games-enum";
import deck from "../uno/deck.json";
import {useTexture} from "@react-three/drei";
import {TextureLoader} from "three";
import * as THREE from 'three';


class Board extends React.Component {

    constructor(props) {
        super(props);
        this.boardTexture = new THREE.TextureLoader().load(props.texture);
    }

    render() {
        return (
            <mesh position={[0, 0, 0]}>
                <boxBufferGeometry attach="geometry"
                                   args={[100, 100, 0.04]}/>
                <meshStandardMaterial attach="material" map={this.boardTexture}/>
            </mesh>
        );
    }
}

export default Board;