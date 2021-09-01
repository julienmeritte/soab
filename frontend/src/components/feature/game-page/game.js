import React, {useState, useEffect, useRef} from "react";
import {set, useForm} from "react-hook-form"
import "../../../config/app.url.json";
import "./game.scss";
import openSocket from 'socket.io-client';
import Uno from "../../../games/uno/Uno";
import {GAMES_ENUM} from "../../../enums/games-enum";

const socket = openSocket('http://localhost:3002');


class GamePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roomCreated: false,
            player: {},
            game: GAMES_ENUM.UNO,
            allReady: false,
            currentGame: [],
            listPlayer: [],
            name: "",
            room: "",
        }
    }

    componentDidMount() {
        setInterval(() => {
            if (this.roomCreated) {
                socket.emit('getAllPlayersByRoom', {room: this.player.room});
                socket.on('givePlayersByRoom', (value) => {
                    this.setState({
                        listPlayer: value,
                    })
                });
            }
            console.log('player: ', this.state.player);
            console.log('listPlayer: ', this.state.listPlayer);
        }, 1000);
    }


    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    handleRoomChange = (event) => {
        this.setState({room: event.target.value});
    }

    handlePlayerSubmit = (event) => {
        event.preventDefault();
        this.setState({
            roomCreated: true,
        })
        socket.emit('createPlayer', {name: this.state.name, room: this.state.room});
        socket.on('getPlayer', (value) => {
            this.setState({
                player: value,
            })
        })
    };

    render () {
        const { roomCreated , allReady , currentGame , name , room  , player} = this.state;
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
                    <div>
                    </div>
                    {allReady ? currentGame : (
                        <div/>
                    )}
                </div>
            </div>
        )
    }
}








export default GamePage;
