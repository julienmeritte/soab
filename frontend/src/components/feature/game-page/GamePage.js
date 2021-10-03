import React, { useState, useEffect, useRef } from "react";
import { set, useForm } from "react-hook-form";
import "../../../config/app.url.json";
import "./GamePage.scss";
import openSocket, { io } from "socket.io-client";
import Uno from "../../../games/uno/Uno";
import { GAMES_ENUM } from "../../../enums/games-enum";
import Card from "../../../games/components/Card";
import properties from "../../../games/uno/properties.json";
import Chat from "../../../games/components/Chat";
import deck from "../../../games/uno/deck.json";
import * as THREE from "three";

const socket = openSocket("http://localhost:3002");

class GamePage extends React.Component {
  constructor(props) {
    super(props);

    this.deckPosition = [-30, 0, 0];
    this.textureLoader = new THREE.TextureLoader();
    this.textBack = `${process.env.PUBLIC_URL}/assets/images/uno/card_back_alt.png`;
    this.textBoard = `${process.env.PUBLIC_URL}/assets/images/uno/uno_board.png`;

    this.textLoadedBack = this.textureLoader.load(this.textBack);
    this.textLoadedBoard = this.textureLoader.load(this.textBoard);

    this.BUTTON_SPRITE = {
      DISTRIB_ALL: this.textureLoader.load(
        `${process.env.PUBLIC_URL}/assets/images/uno/uno_button1.png`
      ),
      DRAW_ONE: this.textureLoader.load(
        `${process.env.PUBLIC_URL}/assets/images/uno/button_draw.png`
      ),
      REORDER: this.textureLoader.load(
        `${process.env.PUBLIC_URL}/assets/images/uno/uno_button3.png`
      ),
      YELLOW: this.textureLoader.load(
        `${process.env.PUBLIC_URL}/assets/images/uno/button_yellow.png`
      ),
      RED: this.textureLoader.load(
        `${process.env.PUBLIC_URL}/assets/images/uno/button_red.png`
      ),
      GREEN: this.textureLoader.load(
        `${process.env.PUBLIC_URL}/assets/images/uno/button_green.png`
      ),
      BLUE: this.textureLoader.load(
        `${process.env.PUBLIC_URL}/assets/images/uno/button_blue.png`
      ),
    };

    this.state = {
      roomCreated: false,
      player: {},
      game: sessionStorage.getItem("gameEnum"),
      allReady: false,
      listPlayer: [],
      name: "test",
      room: "oui",
      changes: "",
      canPlay: -1,
      playerNumber: -1,
      cards: this.initCards(),
      listMessages: [],
      texte: "",
      winner: -1,
    };
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.roomCreated) {
        socket.emit("getAllPlayersByRoom", {
          room: this.state.player.room,
        });
        socket.on("givePlayersByRoom", (data) => {
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
        if (
          !this.state.allReady &&
          this.checkArrayEmpty(this.state.listPlayer) &&
          ready
        ) {
          for (let i = 0; i < this.state.listPlayer.length; i++) {
            if (this.state.listPlayer[i].code === this.state.player.code) {
              this.setState({
                playerNumber: i,
              });
            }
          }
          this.setState({
            allReady: true,
            canPlay: 0,
          });
        }
      }
    }, 1000);
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onSendMsg = (text) => {
    socket.emit("sendMessage", {
      name: this.state.player.name,
      msg: text,
      room: this.state.player.room,
    });
    this.setState({ text: "" });
  };

  onReceivedMsg = () => {
    socket.emit("getAllMessage", { room: this.state.player.room });
    socket.on("getAllMessageReturn", (data) => {
      this.setState({ listMessages: data });
    });
  };

  handleRoomChange = (event) => {
    this.setState({ room: event.target.value });
  };

  checkArrayEmpty(array) {
    if (
      typeof array != "undefined" &&
      array != null &&
      array.length != null &&
      array.length > 0
    ) {
      return true;
    }
    return false;
  }

  handlePlayerSubmit = (event) => {
    event.preventDefault();
    this.setState({
      roomCreated: true,
    });
    socket.emit("createPlayer", {
      name: this.state.name,
      room: this.state.room,
    });
    socket.on("getPlayer", (value) => {
      this.setState({
        player: value,
      });
    });
  };

  setPlayerReady = () => {
    socket.emit("setPlayerReady", {
      code: this.state.player.code,
    });
  };

  sendFromChild = (cards, action, texte) => {
    socket.emit("setHand", {
      code: this.state.listPlayer[0].code,
      cards: cards,
      action: action,
      texte: texte,
    });
  };

  updateTexteFromChild = (texte) => {
    this.setState({
      texte: texte,
    });
  };

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
    for (let i = 0; i < cards.length; i++) {
      cards[i].position[0] = this.deckPosition[0];
      cards[i].position[1] = this.deckPosition[1];
      cards[i].position[2] = (
        this.deckPosition[2] +
        shuffledArray[i] * 0.01
      ).toFixed(2);
      cards[i].owner = -1;
    }
    return cards;
  }

  shuffleCardsFromChild = (cards) => {
    let shuffle = [];
    for (let i = 0; i < cards.length; i++) {
      shuffle.push(i);
    }
    const shuffledArray = shuffle.sort((a, b) => 0.5 - Math.random());
    for (let i = 0; i < cards.length; i++) {
      if (cards.owner === -2 || cards.owner === -1) {
        cards[i].position[0] = this.deckPosition[0];
        cards[i].position[1] = this.deckPosition[1];
        cards[i].position[2] = (
          this.deckPosition[2] +
          shuffledArray[i] * 0.01
        ).toFixed(2);
        cards[i].owner = -1;
      }
    }
    return cards;
  };

  setCanActionFromChild = () => {
    if (this.state.playerNumber === 0) {
      this.setState({
        canPlay: 1,
      });
    } else {
      this.setState({
        canPlay: 0,
      });
    }
  };

  refreshCardsFromChild = () => {
    let creator;
    for (let player of this.state.listPlayer) {
      if (player.creator) {
        creator = player;
        break;
      }
    }
    if (creator) {
      socket.emit(
        "getCardsFromCreator",
        {
          code: creator.code,
        },
        (response) => {
          if (response.cards && response.cards.length > 0) {
            let cards = this.state.cards;
            for (let i = 0; i < response.cards.length; i++) {
              cards[i].owner = response.cards[i].owner;
              if (cards[i].owner === -2) {
                cards[i].rotation[1] = response.cards[i].rotation[1];
                cards[i].position[2] = response.cards[i].position[2];
              }
            }
            this.setState({
              cards: this.reorderCardsInParent(cards),
              texte: response.texte,
            });
            if (response.action >= 0) {
              this.setState({
                canPlay: response.action,
              });
            }
          }
        }
      );
    }
  };

  reorderCardsInParent(cards) {
    let playerCards = [];
    let enemyCards = [];
    let middleCards = [];
    for (let card of cards) {
      if (card.owner === this.state.playerNumber) {
        playerCards.push(card.index);
      } else if (card.owner >= 0) {
        enemyCards.push(card.index);
      } else if (card.owner === -2) {
        middleCards.push(card.index);
      }
    }
    if (playerCards.length === 0) {
      this.setWinnerFromChild(this.state.playerNumber);
    } else if (enemyCards.length === 0) {
      this.setWinnerFromChild(this.getOtherPlayerId());
    }
    let larger = 60 / playerCards.length;
    for (let i = 0; i < playerCards.length; i++) {
      cards[playerCards[i]].position[0] = -27 + i * larger;
      cards[playerCards[i]].position[1] = -32.5;
      cards[playerCards[i]].position[2] = 0.01 * i;
      cards[playerCards[i]].rotation[1] = Math.PI;
    }
    larger = 60 / enemyCards.length;
    for (let i = 0; i < enemyCards.length; i++) {
      cards[enemyCards[i]].position[0] = -27 + i * larger;
      cards[enemyCards[i]].position[1] = 32.5;
      cards[enemyCards[i]].position[2] = 0.01 * i;
      cards[enemyCards[i]].rotation[1] = 0;
    }
    for (let i = 0; i < middleCards.length; i++) {
      cards[middleCards[i]].position[0] = 0;
      cards[middleCards[i]].position[1] = 0;
    }
    return cards;
  }

  getOtherPlayerId() {
    if (this.currentPlayer === 0) {
      return 1;
    } else {
      return 0;
    }
  }

  setWinnerFromChild = (winner) => {
    this.setState({
      winner: winner,
    });
  };

  initCards = () => {
    let cards = [];
    for (let i = 0; i < deck.cards.length; i++) {
      cards.push({
        index: i,
        position: [
          this.deckPosition[0],
          this.deckPosition[1],
          this.deckPosition[2] + i * 0.01,
        ],
        rotation: [0, 0, 0],
        image: this.textureLoader.load(
          `${process.env.PUBLIC_URL}/assets/images/uno/${deck.cards[i].image}`
        ),
        owner: -1,
        type: deck.cards[i].type,
        color: deck.cards[i].color,
        number: deck.cards[i].number,
      });
    }
    return this.shuffleCards(cards);
  };

  render() {
    const {
      roomCreated,
      allReady,
      name,
      room,
      player,
      canPlay,
      cards,
      changes,
      playerNumber,
      texte,
      winner,
    } = this.state;
    return (
      <div>
        {winner === -1 ? (
          <div className="chat-main">
            {!roomCreated ? (
              <form onSubmit={this.handlePlayerSubmit}>
                <input
                  type="text"
                  onChange={this.handleNameChange}
                  value={name}
                  placeholder="name"
                />
                <input
                  type="text"
                  onChange={this.handleRoomChange}
                  value={room}
                  placeholder="room name"
                />
                <input type="submit" />
              </form>
            ) : (
              <div />
            )}

            {allReady ? (
              <div className={"game-scene"}>
                <Uno
                  playerNumber={playerNumber}
                  sendFromChild={this.sendFromChild}
                  refreshCardsFromChild={this.refreshCardsFromChild}
                  canPlay={canPlay}
                  changes={changes}
                  cards={cards}
                  textBack={this.textLoadedBack}
                  textBoard={this.textBoard}
                  buttonSprite={this.BUTTON_SPRITE}
                  setCanActionFromChild={this.setCanActionFromChild}
                  shuffleCardsFromChild={this.shuffleCardsFromChild}
                  texte={texte}
                  updateTexteFromChild={this.updateTexteFromChild}
                  winner={winner}
                  setWinnerFromChild={this.setWinnerFromChild}
                />
              </div>
            ) : (
              <div>
                <button
                  className={"game-button-ready"}
                  onClick={this.setPlayerReady}
                >
                  Prêt
                </button>
                {
                  <ul class="players">
                    {this.state.listPlayer.map((player) => (
                      <div>
                        <li>
                          {player.name} :{" "}
                          {player.ready ? (
                            <img
                              class="check"
                              src="./assets/images/check/check.png"
                            ></img>
                          ) : (
                            <img
                              class="check"
                              src="./assets/images/check/no_check.png"
                            ></img>
                          )}
                        </li>
                      </div>
                    ))}
                  </ul>
                }
                <br />
                Tous les joueurs ne sont pas prêts.
              </div>
            )}
          </div>
        ) : (
          <div>FIN DE GAME</div>
        )}
        <div class="chat" key="chat">
          <Chat
            onSendMsg={this.onSendMsg}
            onReceivedMsg={this.onReceivedMsg}
            player={this.state.player}
            listMessages={this.state.listMessages}
          />
        </div>
      </div>
    );
  }
}

export default GamePage;
