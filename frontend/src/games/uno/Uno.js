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
        this.image = new THREE.TextureLoader().load(props.image);
    }

    render() {
        return (
            <mesh position={[this.props.position[0], this.props.position[1], this.props.position[2]]}
                  onClick={(e) => {
                      this.props.cardClick(this.props.index, e);
                  }}>
                <boxBufferGeometry attach="geometry"
                                   args={[this.props.buttonSize[0], this.props.buttonSize[1], 0.04]}/>
                <meshStandardMaterial attach="material" map={this.image}/>
            </mesh>
        );
    }
}


class Uno extends React.Component {

    constructor(props) {
        super(props);

        this.BUTTON_SPRITE = {
            DISTRIB_ALL: `${process.env.PUBLIC_URL}/assets/images/uno/uno_button1.png`,
            DRAW_ONE: `${process.env.PUBLIC_URL}/assets/images/uno/uno_button2.png`,
            REORDER: `${process.env.PUBLIC_URL}/assets/images/uno/uno_button3.png`
        }

        this.players = [1, 2];
        this.currentPlayer = this.props.playerNumber;

        this.camera = {fov: 75, position: [0, 0, 65]}

        this.cardPlayerOne = [];
        this.cardPlayerTwo = [];

        this.currentGame = GAMES_ENUM.UNO;
        this.deckPosition = [-30, 0, 0];
        this.textureLoader = new THREE.TextureLoader();
        this.textBack = `${process.env.PUBLIC_URL}/assets/images/uno/card_back.png`;
        this.textBoard = `${process.env.PUBLIC_URL}/assets/images/uno/uno_board.png`;

        this.backTexture = this.textureLoader.load(this.textBack);

        //this.cards = [];

        console.log('init cards parent', this.props.cards);

        this.state = {
            cards: this.props.cards,
            blankTexture: this.textureLoader.load(this.textBack)
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

            /*if (!this.props.canPlay) {
                console.log('exists', this.props.cards);
                this.setState({
                    cards: this.props.cards
                })
            } else {
                console.log('dont exists', this.props.cards);
            }*/
        }, 200);
    }

    shuffleCards(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }
        for (let i = 0; i < cards.length; i++) {
            cards[i].index = i;
            cards[i].position[0] = this.deckPosition[0];
            cards[i].position[1] = this.deckPosition[1];
            cards[i].position[2] = this.deckPosition[2] + i * 0.01;
        }
        return cards;
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
            console.log('CARD IN CHILD', card);
            console.log('CARDS FROM PARENT', this.props.cards);
        }
    }

    buttonOnClick = (index, e) => {
        e.stopPropagation();
        if (this.props.canPlay) {
            switch (index) {
                case 0:
                    console.log('Click button distribution cartes');
                    break;
                case 1:
                    console.log('Click button piocher carte');
                    this.drawOneCard();
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

    drawOneCard = () => {
        let cards = this.state.cards;
        let indexToGet = 0;
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].owner === -1) {
                indexToGet = i;
                break;
            }
        }
        let card = this.state.cards[indexToGet];
        card.position[0] += 10;
        card.position[1] -= 32;
        card.rotation[1] = Math.PI;
        card.owner = this.currentPlayer;
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
            }
        }
        for (let i = 0; i < playerCards.length; i++) {
            cards[playerCards[i]].position[0] = -20 + i * 6;
            cards[playerCards[i]].position[3] = 0.01 * i;
        }
        this.setState({cards});
        this.props.sendFromChild(this.state.cards);
        console.log(playerCards);
    }

    visualizeCard = (image) => {
        this.setState({
            blankTexture: image
        })
    }

    /*distributeCardsToPlayer() {
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

    render() {
        return (
            <Canvas camera={this.camera} resize={{scroll: false, debounce: {scroll: 0, resize: 0}}}>
                <ambientLight intensity={0.6}/>
                <Board texture={this.textBoard}/>
                {this.props.cards.map((card) => <Card
                    position={card.position}
                    rotation={card.rotation}
                    texture={[this.backTexture, card.image]}
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
                              buttonSize={[14, 6, 0.04]} image={this.BUTTON_SPRITE.REORDER} index={2}/>
                <ActionButton position={[40, -3.5, 0]} cardClick={this.buttonOnClick} rotation={[0, 0, 0]}
                              buttonSize={[14, 6, 0.04]} image={this.BUTTON_SPRITE.DRAW_ONE} index={1}/>
                <ActionButton position={[40, -10, 0]} cardClick={this.buttonOnClick} rotation={[0, 0, 0]}
                              buttonSize={[14, 6, 0.04]} image={this.BUTTON_SPRITE.DISTRIB_ALL} index={0}/>
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