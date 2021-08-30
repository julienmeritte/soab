import Card from "../components/Card";
import Board from "../components/Board";
import {Canvas, useLoader, useThree} from "@react-three/fiber";
import React, {useState} from "react";
import deck from "./deck.json";
import properties from "./properties.json";

export default function Uno() {

    // DEBUT Mocks SocketIO
    const players = [1,2];
    //FIN Mocks SocketIO


    // Constantes ThreeJS
    const camera = {fov: 75, position: [0, 0, 65]}
    const cards = [];

    // Constantes Jeu
    const deckPosition = [-30, 0, 0];
    const textBack = `${process.env.PUBLIC_URL}/assets/images/uno/card_back.png`;

    // Initialisation Deck
    for (let i = 0; i < deck.cards.length; i++) {
        const textFront = `${process.env.PUBLIC_URL}/assets/images/uno/${deck.cards[i].image}`;
        cards.push(<Card
            position={[deckPosition[0], deckPosition[1], deckPosition[2] + i * 0.01]}
            texture={[textBack, textFront]}
            cardClick={cardOnClick} key={i} index={i} card={deck.cards[i]}
            properties={properties.properties}

        />);
    }

    console.log(cards);

    return (
        <Canvas camera={camera} resize={{scroll: false, debounce: {scroll: 0, resize: 0}}}>
            <ambientLight intensity={0.5}/>
            <spotLight position={[10, 15, 10]} angle="0.3"/>
            <Board/>
            {cards}
        </Canvas>
    );

    function cardOnClick(index) {
        //cards[index].props.position[1] += 10;
    }
}
