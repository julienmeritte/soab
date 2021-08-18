import React , { useState , useEffect} from "react";
import { set, useForm } from "react-hook-form"
import "../../../config/app.url.json";
import "./game.scss";
import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3002');




function Game() {
      let createPlayer = 0;
      let sendMsg = 0;
      const [player, setPlayer] = useState();
      const [msg , setMsg] = useState([]);
      const [item , setItem] = useState([]);
      const [msgCount , setMsgCount] = useState([]);
      const { register, handleSubmit } = useForm();

      setInterval(() => {
          if(player != null) {
            socket.emit('getAllMessage' , (player.room));
            socket.on('getAllMessageReturn' , (data) => {
                data.forEach(element => {
                  item.push ("<p>"+ element.text +"</p>");
                });
            });
            console.log(item);
          }
      }, 5000);
      const createPlayerSubmit = data => {
              if (createPlayer == 0) {
                createPlayer = 1;
                socket.emit('createPlayer' , {name: data.name , room: data.room});
                socket.on('getPlayer' , (value) => {
                  setPlayer(value);
                })
              }
      };
      const sendMsgSubmit = data => {
        socket.emit('sendMessage' , {msg: data.text , room : player.room , name : player.name});
    };


      return (
        
        <div className="game-scene">
          <form onSubmit={handleSubmit(createPlayerSubmit)}>
            <input {...register("name")} placeholder="your msg" />
            <input {...register("room")} placeholder="your msg" />
            <input type="submit" />
          </form>
          <form onSubmit={handleSubmit(sendMsgSubmit)}>
            <input {...register("text")} placeholder="your msg" />
            <input type="submit" />
          </form>
          <div>
            {item}
          </div>
        </div>
      );
}


export default Game;
