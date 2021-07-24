import React from "react";
import "../../../config/app.url.json";
import Uno from "../../../games/uno/uno";
import "./game.scss";

function Game() {
  return (
    <div className="game-scene">
      <Uno />
    </div>
  );
}

export default Game;
