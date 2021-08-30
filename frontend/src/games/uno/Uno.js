import Card from "../components/Card";
import Board from "../components/Board";
import {Canvas, useLoader, useThree} from "@react-three/fiber";
import React, {useState} from "react";
import deck from "./deck.json";
import properties from "./properties.json";

export default function Uno() {

    // DEBUT Mocks SocketIO
    const players = [1, 2];
    //FIN Mocks SocketIO


    // Constantes ThreeJS
    const camera = {fov: 75, position: [0, 0, 65]}
    const cards = [];

    // Constantes Jeu
    const deckPosition = [-40, 0, 0];
    const textBack = `${process.env.PUBLIC_URL}/assets/images/uno/card_back.png`;

    // Initialisation Deck
    for (let i = 0; i < deck.cards.length; i++) {
        const textFront = `${process.env.PUBLIC_URL}/assets/images/uno/${deck.cards[i].image}`;
        cards.push(<Card
            position={[deckPosition[0] + i * 1.6, deckPosition[1], deckPosition[2] + i * 0.01]}
            texture={[textBack, textFront]}
            cardClick={cardOnClick} key={i} index={i} card={deck.cards[i]}
            properties={properties.properties}

        />);
    }

    shuffleCards();

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

    function shuffleCards() {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }
        for (let i = 0; i < cards.length; i++) {
            cards[i].props.position[0] = deckPosition[0] + i * 1.6;
            cards[i].props.position[1] = deckPosition[1];
            cards[i].props.position[2] = deckPosition[2] + i * 0.01;
        }
    }
}
