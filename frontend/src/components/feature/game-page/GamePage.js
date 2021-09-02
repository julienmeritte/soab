import React, {useState, useEffect, useRef} from "react";
import {set, useForm} from "react-hook-form"
import "../../../config/app.url.json";
import "./GamePage.scss";
import openSocket, { io } from 'socket.io-client';
import Uno from "../../../games/uno/Uno";
import {GAMES_ENUM} from "../../../enums/games-enum";
import Card from "../../../games/components/Card";
import properties from "../../../games/uno/properties.json";
import Chat from "../../../games/components/Chat";

const socket = openSocket('http://localhost:3002');


class GamePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            roomCreated: false,
            player: {},
            game: sessionStorage.getItem("gameEnum"),
            allReady: false,
            listPlayer: [],
            name: "test",
            room: "oui",
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
                for(const player of this.state.listPlayer) {
                    if (player.ready === false) {
                        ready = false;
                    }
                }
                if (!this.state.allReady && this.checkArrayEmpty(this.state.listPlayer) && ready) {
                    this.setState({
                        allReady: true
                    });
                }
            }
            /*console.log('listPlayer: ', this.state.listPlayer);
            console.log('player: ', this.state.player);*/
        }, 1000);
    }


    handleNameChange = (event) => {
        this.setState({name: event.target.value});
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

    sendFromChild = () => {
        console.log(this.state.player);
        socket.emit('setHand', {
            socketID: this.state.player.socketID,
            test: 'oui'
        });
        socket.on('getCards', (value) => {
            console.log('getCards reçu : ', value.message);
        })
    }

    render() {
        const {roomCreated, allReady, name, room, player} = this.state;
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
                                <Uno sendFromChild={this.sendFromChild}/>
                            </div>
                        )
                        : (
                            <div>
                                <button className={'game-button-ready'} onClick={this.setPlayerReady}>Prêt</button>
                                {this.state.listPlayer.map((player) => <div>
                                        {player.name} : {player.ready ? (<span>Prêt</span>) : (<span>Pas prêt</span>)}
                                    </div>
                                )}<br/>
                                Tous les joueurs ne sont pas prêts.
                            </div>
                        )}
                </div>
                <div class="chat">
                    <Chat socket={this.state.socket}/>
                </div>
            </div>
        )
    }
}


export default GamePage;
