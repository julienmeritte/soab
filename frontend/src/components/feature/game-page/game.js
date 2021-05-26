import React from "react";
import "../../../config/app.url.json";
import TimeBombScene from "../../../games/TimeBomb/TimeBombScene";
import "./game.scss";

function Game() {
  return (
    <div class="game-scene">
      <TimeBombScene />
    </div>
  );
}

export default Game;
