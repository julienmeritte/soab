import Card from "../components/Card";
import Board from "../components/Board";
import {Canvas, useLoader, useThree} from "@react-three/fiber";
import React, {createRef, useRef, useState} from "react";
import deck from "./deck.json";
import properties from "./properties.json";
import {set} from "react-hook-form";
import {GAMES_ENUM} from "../../enums/games-enum";

class Uno extends React.Component {

    constructor(props) {
        super(props);

        // DEBUT Mocks SocketIO
        this.players = [1, 2];
        this.currentPlayer = 1;

        //FIN Mocks SocketIO


        // Constantes ThreeJS
        this.camera = {fov: 75, position: [0, 0, 65]}

        this.cardPlayerOne = [];
        this.cardPlayerTwo = [];

        // Constantes Jeu
        this.cards = [];
        this.currentGame = GAMES_ENUM.UNO;
        this.deckPosition = [-30, 0, 0];
        this.textBack = `${process.env.PUBLIC_URL}/assets/images/uno/card_back.png`;
        this.textBoard = `${process.env.PUBLIC_URL}/assets/images/uno/uno_board.png`;

        // Initialisation Deck

        this.state = {
            cards: this.setupCards()
        }

        console.log('Before deck: ', this.state.cards);


    }

    setupCards() {
        const temp = [];
        for (let i = 0; i < deck.cards.length; i++) {
            temp.push({
                index: i,
                position: [this.deckPosition[0] + i * 1.2, this.deckPosition[1], this.deckPosition[2] + i * 0.01],
                rotation: [0, 0, 0],
                image: `${process.env.PUBLIC_URL}/assets/images/uno/${deck.cards[i].image}`
            });
            /*this.cards.push(<Card
                position={[this.state.x /!*+ i * 1.2*!/, this.deckPosition[1], this.deckPosition[2] + i * 0.01]}
                texture={[this.textBack, textFront]}
                cardClick={this.cardOnClick} key={i} index={i}
                properties={properties.properties}
            />);*/
        }
        return temp;
    }

    cardOnClick = (index, e) => {
        e.stopPropagation();
        let cards = [...this.state.cards];
        let card = {...this.state.cards[index]};
        card.rotation[1] -= Math.PI;
        cards[index] = card;
        this.setState({cards});
        console.log('click', index);
        console.log('x', card);
    }

    render() {
        return (
            <Canvas camera={this.camera} resize={{scroll: false, debounce: {scroll: 0, resize: 0}}}>
                <ambientLight intensity={0.6}/>
                <Board texture={this.textBoard}/>
                {/*{this.cards}*/}
                {this.state.cards.map((card) => <Card
                    position={card.position}
                    rotation={card.rotation}
                    texture={[this.textBack, card.image]}
                    cardClick={this.cardOnClick} key={card.index} index={card.index}
                    properties={properties.properties}
                />)}
            </Canvas>
        );
    }


    //setupGameStart();

    /*function setupGameStart() {
        shuffleCards();
        setTimeout(() => {
            distributeCardsToPlayer();
        }, 1000);

    }*/


    /*function distributeCardsToPlayer() {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                if (i % 2 === 0) {
                    cardPlayerOne.push(cards[cards.length - 1]);
                    cardPlayerOne[i / 2].props.position[1] = -32.5;
                    cardPlayerOne[i / 2].props.position[0] += 12 + 5 * i;
                    if (currentPlayer === 1) {
                        cardPlayerOne[i / 2].props.position[2] = -12;
                    }
                    // console.log('player1Deck: ', cardPlayerOne);
                } else if (i % 2 === 1) {
                    cardPlayerTwo.push(cards[cards.length - 1]);
                    cardPlayerTwo[parseInt(i / 2)].props.position[1] = 32.5;
                    cardPlayerTwo[parseInt(i / 2)].props.position[0] += 12 + 5 * (i - 1);
                    if (currentPlayer === 2) {
                        cardPlayerTwo[parseInt(i / 2)].props.position[2] = -12;
                    }
                    // console.log('player2Deck: ', cardPlayerTwo);
                }
                cards.splice(cards.length - 1, 1);
            }, 200 * i);
        }
    }*/


    /*function shuffleCards() {
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
    }*/
}

export default Uno;