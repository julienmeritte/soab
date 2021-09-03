import React, {useState, useEffect, useRef} from "react";
import {set, useForm} from "react-hook-form"
import "../../../config/app.url.json";
import "./GamePage.scss";
import openSocket, {io} from 'socket.io-client';
import Uno from "../../../games/uno/Uno";
import {GAMES_ENUM} from "../../../enums/games-enum";
import Card from "../../../games/components/Card";
import properties from "../../../games/uno/properties.json";
import Chat from "../../../games/components/Chat";
import deck from "../../../games/uno/deck.json";
import * as THREE from "three";

const socket = openSocket('http://localhost:3002');


class GamePage extends React.Component {
    constructor(props) {
        super(props)

        this.deckPosition = [-30, 0, 0];
        this.textureLoader = new THREE.TextureLoader();
        this.textBack = `${process.env.PUBLIC_URL}/assets/images/uno/card_back.png`;
        this.textBoard = `${process.env.PUBLIC_URL}/assets/images/uno/uno_board.png`;

        this.textLoadedBack = this.textureLoader.load(this.textBack);
        this.textLoadedBoard = this.textureLoader.load(this.textBoard);

        this.BUTTON_SPRITE = {
            DISTRIB_ALL: this.textureLoader.load(`${process.env.PUBLIC_URL}/assets/images/uno/uno_button1.png`),
            DRAW_ONE: this.textureLoader.load(`${process.env.PUBLIC_URL}/assets/images/uno/uno_button2.png`),
            REORDER: this.textureLoader.load(`${process.env.PUBLIC_URL}/assets/images/uno/uno_button3.png`)
        }

        this.state = {
            roomCreated: false,
            player: {},
            game: sessionStorage.getItem("gameEnum"),
            allReady: false,
            listPlayer: [],
            name: "test",
            room: "oui",
            changes: '',
            canPlay: false,
            playerNumber: -1,
            cards: this.initCards(),
            listMessages: [],
        }
    }

    componentDidMount() {
        setInterval(() => {
            if (this.state.roomCreated) {
                socket.emit('getAllPlayersByRoom', {
                    room: this.state.player.room
                });
                socket.on('givePlayersByRoom', (data) => {
                    this.setState({
                        listPlayer: data.players,
                    });
                });
                var ready = true;
                for (const player of this.state.listPlayer) {
                    if (player.ready === false) {
                        ready = false;
                    }
                }
                if (!this.state.allReady && this.checkArrayEmpty(this.state.listPlayer) && ready) {
                    for (let i = 0; i < this.state.listPlayer.length; i++) {
                        if (this.state.listPlayer[i].code === this.state.player.code) {
                            this.setState({
                                playerNumber: i
                            });
                        }
                    }
                    this.setState({
                        allReady: true,
                        canPlay: this.state.player.creator
                    });
                }
            }
        }, 1000);
    }


    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onSendMsg = (text) => {
        socket.emit('sendMessage' , {name: this.state.player.name , msg : text , room: this.state.player.room});
        this.setState({text : ""});
    }

    onReceivedMsg = () => {
        socket.emit('getAllMessage' , {room: this.state.player.room});
        socket.on('getAllMessageReturn' , (data) => {
           this.setState({listMessages : data});
        });
    }


    handleRoomChange = (event) => {
        this.setState({room: event.target.value});
    }

    checkArrayEmpty(array) {
        if (typeof array != "undefined" && array != null && array.length != null && array.length > 0) {
            return true
        }
        return false;
    }

    handlePlayerSubmit = (event) => {
        event.preventDefault();
        this.setState({
            roomCreated: true,
        })
        socket.emit('createPlayer', {
            name: this.state.name,
            room: this.state.room
        });
        socket.on('getPlayer', (value) => {
            this.setState({
                player: value,
            })
        })
    };

    setPlayerReady = () => {
        console.log('THIS', this.state.player.code);
        socket.emit('setPlayerReady', {
            code: this.state.player.code
        });
    }

    sendFromChild = (cards) => {
        socket.emit('setHand', {
            code: this.state.player.code,
            cards: cards
        });
    }

    /*sendFromParent(cards) {
        socket.emit('setHand', {
            code: this.state.player.code,
            cards: cards
        });
    }*/

    shuffleCards(cards) {
        let shuffle = [];
        for (let i = 0; i < cards.length; i++) {
            shuffle.push(i);
        }
        const shuffledArray = shuffle.sort((a, b) => 0.5 - Math.random());
        console.log('shuffle', shuffledArray);
        for (let i = 0; i < cards.length; i++) {
            cards[i].position[0] = this.deckPosition[0];
            cards[i].position[1] = this.deckPosition[1];
            cards[i].position[2] = (this.deckPosition[2] + shuffledArray[i] * 0.01).toFixed(2);
        }
        return cards;
    }

    refreshCardsFromChild = () => {
        let creator;
        for (let player of this.state.listPlayer) {
            if (player.creator) {
                creator = player;
                break;
            }
        }
        if (creator) {
            socket.emit('getCardsFromCreator', {
                code: creator.code
            }, (response) => {
                if (response && response.length > 0) {;
                    let cards = this.state.cards;
                    for (let i = 0; i < response.length; i++) {
                        cards[i].position = response[i].position;
                        cards[i].rotation = response[i].rotation;
                    }
                    this.setState({
                        cards: cards
                    });
                    /*this.setState({
                        //canPlay: false
                        cards: response
                    });*/
                }
            });
        }

        //console.log(creator);
    }

    initCards = () => {
            let cards = [];
            for (let i = 0; i < deck.cards.length; i++) {
                cards.push({
                    index: i,
                    position: [this.deckPosition[0], this.deckPosition[1], this.deckPosition[2] + i * 0.01],
                    rotation: [0, 0, 0],
                    image: this.textureLoader.load(`${process.env.PUBLIC_URL}/assets/images/uno/${deck.cards[i].image}`),
                    owner: -1,
                    type: deck.cards[i].type,
                    color: deck.cards[i].color,
                    number: deck.cards[i].number
                });
            }
            //cards = this.shuffleCards(cards);
            return this.shuffleCards(cards);
    }

    render() {
        const {roomCreated, allReady, name, room, player, canPlay, cards, changes, playerNumber} = this.state;
        return (
            <div>
                <div className="chat-main">
                    {!roomCreated ? (
                        <form onSubmit={this.handlePlayerSubmit}>
                            <input type="text" onChange={this.handleNameChange} value={name} placeholder="name"/>
                            <input type="text" onChange={this.handleRoomChange} value={room} placeholder="room name"/>
                            <input type="submit"/>
                        </form>
                    ) : (
                        <div/>
                    )}

                    {allReady ? (
                            <div className={'game-scene'}>
                                <Uno playerNumber={playerNumber}
                                     sendFromChild={this.sendFromChild}
                                     refreshCardsFromChild={this.refreshCardsFromChild}
                                     canPlay={canPlay}
                                     changes={changes}
                                     cards={cards}
                                     textBack={this.textLoadedBack}
                                     textBoard={this.textBoard}
                                     buttonSprite={this.BUTTON_SPRITE}
                                />
                            </div>
                        )
                        : (
                            <div>
                                <button className={'game-button-ready'} onClick={this.setPlayerReady}>Prêt</button>
                                {
                                    <ul class="players">
                                        {this.state.listPlayer.map((player) =>
                                            <div>
                                                
                                                    <li>
                                                        {player.name} : {player.ready ? (<img class="check" src="./assets/images/check/check.png"></img>) : (
                                                        <img class="check" src="./assets/images/check/no_check.png"></img>)}
                                                    </li>
                                                
                                                
                                            </div>
                                        )}
                                    </ul>
                                }<br/>
                                Tous les joueurs ne sont pas prêts.
                            </div>
                        )}
                </div>
                <div class="chat" key="chat">
                    <Chat onSendMsg={this.onSendMsg} onReceivedMsg={this.onReceivedMsg} player={this.state.player} listMessages={this.state.listMessages}/>
                </div>
            </div>
        )
    }
}


export default GamePage;
