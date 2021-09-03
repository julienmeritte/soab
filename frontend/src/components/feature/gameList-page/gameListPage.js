import React from "react";
import "./gameListPage.scss";
import {GAMES_ENUM} from "../../../enums/games-enum";
import { Redirect } from 'react-router';
import { loadGames } from "../../../actions/game";
import axios from "axios";

class GameListPage extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            ListGame : [],
            redirect: false,
        }
    }

    async loadGameList() {
        const res = await axios.get("api/game");
        this.setState({ListGame: res.data});
    }
    
    componentDidMount() {
        this.loadGameList();
    }

    handleGameSelect = (event) => {
        sessionStorage.setItem("gameEnum" , event);
        this.setState({redirect:true})
    };

    render() {
        const { ListGame ,redirect} = this.state;
        console.log(ListGame);


        if (redirect) {
            return <Redirect to='/Playgame'/>;
        }
        return (
            <div>
                {ListGame.map((value, index) => {
                    return (
                        <div class="games" key={value.key}>
                            <ul>
                                <li>    
                                    <div class="game-item">
                                        <h1>{value.name}</h1>
                                        <a onClick={() => this.handleGameSelect(value.value)}>
                                            <img src={value.picture}></img>
                                            <p class="desc">{value.descr}</p>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        )
    }
}


export default GameListPage;
