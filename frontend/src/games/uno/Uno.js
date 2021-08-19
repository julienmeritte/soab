import Card from "../components/Card";
import Board from "../components/Board";
import {Canvas} from "@react-three/fiber";
import React, { useState } from "react";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import deck from "./deck.json";
import properties from "./properties.json";

export default function Uno() {

    const loader = new GLTFLoader();

    const cards = [];

    for (let i =0; i < deck.cards.length; i++) {
        cards.push(<Card
            position={[deck.cards[i].positions.x, deck.cards[i].positions.y, deck.cards[i].positions.z]}
            cardClick={cardOnClick} key={i} index={i} card={deck.cards[i]} properties={properties.properties}/>);
    }

    return (
        <Canvas camera={{fov: 75, position: [0, 0, 65]}} resize={{scroll: false, debounce: {scroll: 0, resize: 0}}}>
            <ambientLight intensity={0.5}/>
            <spotLight position={[10, 15, 10]} angle="0.3"/>
            <Board/>
            {cards}
        </Canvas>
    );

    function cardOnClick(index) {
        cards[index].props.position[1] += 10;
    }

    function detectSuperposition(position) {

    }
}
