import React, {useState} from "react";
import {GAMES_ENUM} from "../../enums/games-enum";
import deck from "../uno/deck.json";
import {useTexture} from "@react-three/drei";


function Board(props) {

    const boardTexture = useTexture(props.texture);

  return (
    <mesh position={[0, 0, 0]}>
        <boxBufferGeometry attach="geometry"
                           args={[100, 100, 0.04]}/>
        <meshStandardMaterial attach="material" map={boardTexture}/>
    </mesh>
  );
}

export default Board;
