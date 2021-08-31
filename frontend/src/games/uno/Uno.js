import Card from "../components/Card";
import Board from "../components/Board";
import {Canvas, useLoader, useThree} from "@react-three/fiber";
import React, {createRef, useRef, useState} from "react";
import deck from "./deck.json";
import properties from "./properties.json";
import {set} from "react-hook-form";

export default function Uno() {

    // DEBUT Mocks SocketIO
    const players = [1, 2];
    const currentPlayer = 1;
    //FIN Mocks SocketIO


    // Constantes ThreeJS
    const camera = {fov: 75, position: [0, 0, 65]}
    const cards = [];
    const cardPlayerOne = [];
    const cardPlayerTwo = [];

    // Constantes Jeu
    const deckPosition = [-30, 0, 0];
    const textBack = `${process.env.PUBLIC_URL}/assets/images/uno/card_back.png`;

    // Initialisation Deck

    for (let i = 0; i < deck.cards.length; i++) {
        const textFront = `${process.env.PUBLIC_URL}/assets/images/uno/${deck.cards[i].image}`;
        cards.push(<Card
            position={[deckPosition[0], deckPosition[1], deckPosition[2] + i * 0.01]}
            shouldRotate={false}
            rotateState={0}
            texture={[textBack, textFront]}
            cardClick={cardOnClick} key={i} index={i} card={deck.cards[i]}
            properties={properties.properties}
        />);
    }
    console.log('Before deck: ', cards);

    setupGameStart();

    return (
        <Canvas camera={camera} resize={{scroll: false, debounce: {scroll: 0, resize: 0}}}>
            <ambientLight intensity={0.5}/>
            <spotLight position={[10, 15, 10]} angle="0.3"/>
            <Board/>
            {cards}
        </Canvas>
    );

    function setupGameStart() {
        shuffleCards();
        setTimeout(() => {
            distributeCardsToPlayer();
        }, 1000);

    }

    function distributeCardsToPlayer() {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                if (i % 2 === 0) {
                    cardPlayerOne.push(cards[cards.length - 1]);
                    cardPlayerOne[i / 2].props.position[1] = -30;
                    cardPlayerOne[i / 2].props.position[0] += 20 + 5 * i;
                    if (currentPlayer === 1) {
                        cardPlayerOne[i / 2].props.position[2] = -12;
                    }
                    console.log('player1Deck: ', cardPlayerOne);
                } else if (i % 2 === 1) {
                    cardPlayerTwo.push(cards[cards.length - 1]);
                    cardPlayerTwo[parseInt(i / 2)].props.position[1] = 30;
                    cardPlayerTwo[parseInt(i / 2)].props.position[0] += 20 + 5 * (i - 1);
                    if (currentPlayer === 2) {
                        cardPlayerTwo[parseInt(i / 2)].props.position[2] = -12;
                    }
                    console.log('player2Deck: ', cardPlayerTwo);
                }
                cards.splice(cards.length - 1, 1);
            }, 200 * i);
        }
    }

    function cardOnClick(index) {
    }

    function shuffleCards() {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }
        for (let i = 0; i < cards.length; i++) {
            cards[i].props.position[0] = deckPosition[0];
            cards[i].props.position[1] = deckPosition[1];
            cards[i].props.position[2] = deckPosition[2] + i * 0.01;
        }
    }
}
