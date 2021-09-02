import React from "react";
import "./gameListPage.scss";
import {GAMES_ENUM} from "../../../enums/games-enum";
import { Redirect } from 'react-router';
import { loadGames } from "../../../actions/game";


class GameListPage extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            ListGame : [],
            redirect: false,
        }
    }
    
    componentDidMount() {
        console.log('SHEEEEEEEEEEEESH');
        loadGames();
        let arr = [];
        for (let index = 0; index < 10; index++) {
            arr.push({name : "UNO" , value : GAMES_ENUM.UNO , descr: "Un simple jeu de carte connu de tous" ,image_source: "./assets/images/games/uno_background.png" , key : index});
        }
        this.setState({
            ListGame : arr
        })

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
                                            <img src={value.image_source}></img>
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
