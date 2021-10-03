import Card from "../components/Card";
import Board from "../components/Board";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import React, { createRef, useRef, useState } from "react";
import deck from "./deck.json";
import properties from "./properties.json";
import { set } from "react-hook-form";
import { GAMES_ENUM, CARD_COLOR, CARD_TYPE } from "../../enums/games-enum";
import * as THREE from "three";
import { Html } from "@react-three/drei";

class ActionButton extends React.Component {
  constructor(props) {
    super(props);
    //this.image = new THREE.TextureLoader().load(props.image);
  }

  render() {
    return (
      <mesh
        position={[
          this.props.position[0],
          this.props.position[1],
          this.props.position[2],
        ]}
        onClick={(e) => {
          this.props.cardClick(this.props.index, e);
        }}
      >
        <boxBufferGeometry
          attach="geometry"
          args={[this.props.buttonSize[0], this.props.buttonSize[1], 0.04]}
        />
        <meshStandardMaterial attach="material" map={this.props.image} />
      </mesh>
    );
  }
}

class Uno extends React.Component {
  constructor(props) {
    super(props);

    this.players = [1, 2];
    this.currentPlayer = this.props.playerNumber;

    this.camera = { fov: 75, position: [0, 0, 65] };

    this.cardPlayerOne = [];
    this.cardPlayerTwo = [];

    this.currentGame = GAMES_ENUM.UNO;
    this.deckPosition = [-30, 0, 0];

    this.state = {
      cards: this.props.cards,
      blankTexture: this.props.textBack,
      texte: this.props.texte,
    };

    if (this.props.canPlay === this.currentPlayer) {
      this.distributeCards();
    }
  }

  componentDidMount() {
    setInterval(() => {
      if (this.props.canPlay !== this.currentPlayer) {
        this.props.refreshCardsFromChild();
      }
    }, 200);
  }

  cardOnClick = (index, type, e) => {
    e.stopPropagation();
    if (this.props.canPlay === this.currentPlayer && type !== CARD_TYPE.BLANK) {
      let cards = [...this.state.cards];
      let card = { ...this.state.cards[index] };
      let middle = [];
      for (let m of cards) {
        if (m.owner === -2) {
          middle.push(m);
        }
      }
      let topCard = middle[0];
      for (let m of middle) {
        if (m.position[2] > topCard.position[2]) {
          topCard = m;
        }
      }
      if (this.cardCanBePlayed(card, middle, topCard)) {
        middle.push(card);
        card.owner = -2;
        card.position[0] = 0;
        card.position[1] = 0;
        card.position[2] = 0.01 * middle.length;
        cards[index] = card;
        this.setState({
          cards: cards,
        });
        this.props.updateTexteFromChild(card.color);
        this.reorderCards();
        if (
          card.type === CARD_TYPE.SKIP ||
          card.type === CARD_TYPE.FOUR ||
          card.type === CARD_TYPE.CHANGER
        ) {
          this.props.sendFromChild(
            this.state.cards,
            this.currentPlayer,
            this.props.texte
          );
        } else {
          this.props.sendFromChild(
            this.state.cards,
            this.getOtherPlayerId(),
            this.props.texte
          );
          this.props.setCanActionFromChild();
        }
      } else {
      }
    }
  };

  cardCanBePlayed = (card, middle, topCard) => {
    if (middle.length === 0) {
      if (card.type === CARD_TYPE.NUMBER) {
        return true;
      }
    } else {
      if (this.props.texte === CARD_COLOR.MULTI) {
        return false;
      }
      if (card.color === this.props.texte) {
        if (card.type === CARD_TYPE.PICKER) {
          this.drawOneCard(this.getOtherPlayerId());
          this.drawOneCard(this.getOtherPlayerId());
        } else if (
          card.type === CARD_TYPE.CHANGER ||
          card.type == CARD_TYPE.REVERSER
        ) {
          return true;
        }
        return true;
      } else if (card.number >= 0 && card.number === topCard.number) {
        return true;
      } else if (
        (card.type === CARD_TYPE.CHANGER ||
          card.type == CARD_TYPE.REVERSER ||
          card.type === CARD_TYPE.PICKER) &&
        card.color !== CARD_COLOR.MULTI
      ) {
        if (card.type === topCard.type) {
          if (card.type === CARD_TYPE.PICKER) {
            this.drawOneCard(this.getOtherPlayerId());
            this.drawOneCard(this.getOtherPlayerId());
          }
          return true;
        }
      }

      if (card.type === CARD_TYPE.FOUR) {
        this.drawOneCard(this.getOtherPlayerId());
        this.drawOneCard(this.getOtherPlayerId());
        this.drawOneCard(this.getOtherPlayerId());
        this.drawOneCard(this.getOtherPlayerId());
        return true;
      } else if (
        card.type === CARD_TYPE.CHANGER ||
        card.type == CARD_TYPE.REVERSER
      ) {
        return true;
      }
    }
    return false;
  };

  buttonOnClick = (index, e) => {
    e.stopPropagation();
    if (this.props.canPlay === this.currentPlayer) {
      switch (index) {
        case 0:
          for (let i = 0; i < 7; i++) {
            this.drawOneCard(1);
            this.drawOneCard(0);
          }
          this.reorderCards();
          this.props.sendFromChild(
            this.state.cards,
            this.getOtherPlayerId(),
            this.props.texte
          );
          this.props.setCanActionFromChild();
          break;
        case 1:
          this.drawOneCard(this.currentPlayer);
          this.reorderCards();
          this.props.sendFromChild(
            this.state.cards,
            this.currentPlayer,
            this.props.texte
          );
          break;
        case 2:
          this.reorderCards();
          break;
        case 3:
          this.props.updateTexteFromChild(CARD_COLOR.YELLOW);
          this.props.sendFromChild(
            this.state.cards,
            this.getOtherPlayerId(),
            CARD_COLOR.YELLOW
          );
          this.props.setCanActionFromChild();
          break;
        case 4:
          this.props.updateTexteFromChild(CARD_COLOR.RED);
          this.props.sendFromChild(
            this.state.cards,
            this.getOtherPlayerId(),
            CARD_COLOR.RED
          );
          this.props.setCanActionFromChild();
          break;
        case 5:
          this.props.updateTexteFromChild(CARD_COLOR.BLUE);
          this.props.sendFromChild(
            this.state.cards,
            this.getOtherPlayerId(),
            CARD_COLOR.BLUE
          );
          this.props.setCanActionFromChild();
          break;
        case 6:
          this.props.updateTexteFromChild(CARD_COLOR.GREEN);
          this.props.sendFromChild(
            this.state.cards,
            this.getOtherPlayerId(),
            CARD_COLOR.GREEN
          );
          this.props.setCanActionFromChild();
          break;
        default:
          break;
      }
    }
  };

  getOtherPlayerId() {
    if (this.currentPlayer === 0) {
      return 1;
    } else {
      return 0;
    }
  }

  drawOneCard = (indexPlayer) => {
    let cards = this.state.cards;
    let indexToGet = 0;
    var topCard = cards[0];
    let cardsInDeck = [];
    for (let cardDeck of cards) {
      if (cardDeck.owner === -1) {
        cardsInDeck.push(cardDeck);
      }
    }
    if (cardsInDeck.length === 1) {
      this.props.shuffleCardsFromChild(this.state.cards);
    }
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
      cards: cards,
    });
  };

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
    if (playerCards.length === 0) {
      this.props.setWinnerFromChild(this.currentPlayer);
    } else if (enemyCards.length === 0) {
      this.props.setWinnerFromChild(this.getOtherPlayerId())
    }
    console.log("winner", this.props.winner);
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
    this.setState({ cards });
  };

  visualizeCard = (image, index) => {
    if (this.props.cards[index].owner === this.currentPlayer) {
      this.setState({
        blankTexture: image,
      });
    }
  };

  render() {
    return (
      <Canvas
        camera={this.camera}
        resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
      >
        <ambientLight intensity={0.6} />
        <Board texture={this.props.textBoard} />
        {this.props.cards.map((card) => (
          <Card
            position={card.position}
            rotation={card.rotation}
            texture={[this.props.textBack, card.image]}
            cardClick={this.cardOnClick}
            cardVisualize={this.visualizeCard}
            key={card.index}
            index={card.index}
            properties={properties.properties}
            type={card.type}
            color={card.color}
            number={card.number}
          />
        ))}
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
        <ActionButton
          position={[40, 0, 0]}
          cardClick={this.buttonOnClick}
          rotation={[0, 0, 0]}
          buttonSize={[14, 6, 0.04]}
          image={this.props.buttonSprite.DRAW_ONE}
          index={1}
        />
        <Html distanceFactor={100} position={[-2, -8, 0.01]}>
          <div class="content">{this.props.texte}</div>
        </Html>
        {this.props.texte === CARD_COLOR.MULTI &&
          this.props.canPlay === this.currentPlayer && (
            <ActionButton
              position={[17, -14, 0]}
              cardClick={this.buttonOnClick}
              rotation={[0, 0, 0]}
              buttonSize={[10, 4, 0.04]}
              image={this.props.buttonSprite.YELLOW}
              index={3}
            />
          )}
        {this.props.texte === CARD_COLOR.MULTI &&
          this.props.canPlay === this.currentPlayer && (
            <ActionButton
              position={[6, -14, 0]}
              cardClick={this.buttonOnClick}
              rotation={[0, 0, 0]}
              buttonSize={[10, 4, 0.04]}
              image={this.props.buttonSprite.RED}
              index={4}
            />
          )}
        {this.props.texte === CARD_COLOR.MULTI &&
          this.props.canPlay === this.currentPlayer && (
            <ActionButton
              position={[-5, -14, 0]}
              cardClick={this.buttonOnClick}
              rotation={[0, 0, 0]}
              buttonSize={[10, 4, 0.04]}
              image={this.props.buttonSprite.BLUE}
              index={5}
            />
          )}
        {this.props.texte === CARD_COLOR.MULTI &&
          this.props.canPlay === this.currentPlayer && (
            <ActionButton
              position={[-16, -14, 0]}
              cardClick={this.buttonOnClick}
              rotation={[0, 0, 0]}
              buttonSize={[10, 4, 0.04]}
              image={this.props.buttonSprite.GREEN}
              index={6}
            />
          )}
      </Canvas>
    );
  }

  distributeCards() {
    for (let i = 0; i < 7; i++) {
      this.drawOneCard(1);
      this.drawOneCard(0);
    }
    this.reorderCards();
    this.props.sendFromChild(
      this.state.cards,
      this.props.canPlay,
      this.props.texte
    );
  }
}

export default Uno;
