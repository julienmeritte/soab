import Card from "../components/Card";
import Board from "../components/Board";
import {Canvas, useLoader, useThree} from "@react-three/fiber";
import React, {createRef, useRef, useState} from "react";
import deck from "./deck.json";
import properties from "./properties.json";
import {set} from "react-hook-form";
import {GAMES_ENUM, CARD_COLOR, CARD_TYPE} from "../../enums/games-enum";
import * as THREE from "three";

class ActionButton extends React.Component {

    constructor(props) {
        super(props);
        //this.image = new THREE.TextureLoader().load(props.image);
    }

    render() {
        return (
            <mesh position={[this.props.position[0], this.props.position[1], this.props.position[2]]}
                  onClick={(e) => {
                      this.props.cardClick(this.props.index, e);
                  }}>
                <boxBufferGeometry attach="geometry"
                                   args={[this.props.buttonSize[0], this.props.buttonSize[1], 0.04]}/>
                <meshStandardMaterial attach="material" map={this.props.image}/>
            </mesh>
        );
    }
}


class Uno extends React.Component {

    constructor(props) {
        super(props);

        this.players = [1, 2];
        this.currentPlayer = this.props.playerNumber;

        this.camera = {fov: 75, position: [0, 0, 65]}

        this.cardPlayerOne = [];
        this.cardPlayerTwo = [];

        this.currentGame = GAMES_ENUM.UNO;
        this.deckPosition = [-30, 0, 0];

        //this.cards = [];

        console.log('init cards parent', this.props.cards);

        this.state = {
            cards: this.props.cards,
            blankTexture: this.props.textBack
        }

        console.log('Before deck: ', this.state.cards);
        this.props.sendFromChild(this.state.cards);
    }

    componentDidMount() {
        setInterval(() => {
            if (!this.props.canPlay) {
                this.props.refreshCardsFromChild();
                console.log('to refresh child', this.props.cards);
            }
        }, 200);
    }

    cardOnClick = (index, type, e) => {
        e.stopPropagation();
        if (this.props.canPlay && type !== CARD_TYPE.BLANK) {
            let cards = [...this.state.cards];
            let card = {...this.state.cards[index]};
            //card.rotation[1] -= Math.PI;
            cards[index] = card;
            this.setState({cards});
            this.props.sendFromChild(cards);
        }
    }

    buttonOnClick = (index, e) => {
        e.stopPropagation();
        if (this.props.canPlay) {
            switch (index) {
                case 0:
                    console.log('Click button distribution cartes');
                    for (let i = 0; i < 7; i++) {
                        this.drawOneCard(1);
                        this.drawOneCard(0);
                    }
                    this.reorderCards();
                    break;
                case 1:
                    console.log('Click button piocher carte');
                    this.drawOneCard(this.currentPlayer);
                    this.reorderCards();
                    break;
                case 2:
                    console.log('Click button trier cartes');
                    this.reorderCards()
                    break;
                default:
                    console.log('Click button failed');
                    break;
            }
        }
    }

    drawOneCard = (indexPlayer) => {
        let cards = this.state.cards;
        let indexToGet = 0;
        var topCard = cards[0];
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].owner === -1 && cards[i].position[2] > topCard.position[2]) {
                indexToGet = i;
                topCard = cards[i];
            }
        }
        let card = this.state.cards[indexToGet];
        card.position[0] += 10;
        card.position[1] -= 32;
        card.rotation[1] = Math.PI;
        card.owner = indexPlayer;
        cards[indexToGet] = card;
        this.setState({
            cards: cards
        });
        console.log(cards);
        console.log(this.state.cards);
    }

    reorderCards = () => {
        let playerCards = [];
        let enemyCards = [];
        let cards = [...this.state.cards];
        for (let card of cards) {
            if (card.owner === this.currentPlayer) {
                playerCards.push(card.index);
            } else if (card.owner >= 0) {
                enemyCards.push(card.index);
            }
        }
        for (let i = 0; i < playerCards.length; i++) {
            cards[playerCards[i]].position[0] = -27 + i * 6;
            cards[playerCards[i]].position[1] = -32.5;
            cards[playerCards[i]].position[2] = 0.01 * i;
            cards[playerCards[i]].rotation[1] = Math.PI;
        }
        for (let i = 0; i < enemyCards.length; i++) {
            cards[enemyCards[i]].position[0] = -27 + i * 6;
            cards[enemyCards[i]].position[1] = 32.5;
            cards[enemyCards[i]].position[2] = 0.01 * i;
            cards[enemyCards[i]].rotation[1] = 0;
        }
        this.setState({cards});
        this.props.sendFromChild(this.state.cards);
        console.log(playerCards);
    }

    visualizeCard = (image, index) => {
        if (this.props.cards[index].owner === this.currentPlayer) {
            this.setState({
                blankTexture: image
            })
        }
    }

    render() {
        return (
            <Canvas camera={this.camera} resize={{scroll: false, debounce: {scroll: 0, resize: 0}}}>
                <ambientLight intensity={0.6}/>
                <Board texture={this.props.textBoard}/>
                {this.props.cards.map((card) => <Card
                    position={card.position}
                    rotation={card.rotation}
                    texture={[this.props.textBack, card.image]}
                    cardClick={this.cardOnClick}
                    cardVisualize={this.visualizeCard}
                    key={card.index} index={card.index}
                    properties={properties.properties}
                    type={card.type}
                    color={card.color}
                    number={card.number}
                />)}
                <Card
                    position={[-42, -32.5, 0]}
                    rotation={[0, 0, 0]}
                    texture={[this.state.blankTexture, this.state.blankTexture]}
                    properties={properties.properties}
                    cardClick={this.cardOnClick}
                    type={CARD_TYPE.BLANK}
                    number={-1}
                    color={CARD_COLOR.BLANK}
                />
                <ActionButton position={[40, 3, 0]} cardClick={this.buttonOnClick} rotation={[0, 0, 0]}
                              buttonSize={[14, 6, 0.04]} image={this.props.buttonSprite.REORDER} index={2}/>
                <ActionButton position={[40, -3.5, 0]} cardClick={this.buttonOnClick} rotation={[0, 0, 0]}
                              buttonSize={[14, 6, 0.04]} image={this.props.buttonSprite.DRAW_ONE} index={1}/>
                <ActionButton position={[40, -10, 0]} cardClick={this.buttonOnClick} rotation={[0, 0, 0]}
                              buttonSize={[14, 6, 0.04]} image={this.props.buttonSprite.DISTRIB_ALL} index={0}/>
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