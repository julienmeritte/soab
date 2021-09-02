import React from "react";
import "./gameListPage.scss";
import {GAMES_ENUM} from "../../../enums/games-enum";
import { Redirect } from 'react-router'


class GameListPage extends React.Component {
    
    

    constructor(props) {
        super(props)
        this.state = {
            ListGame : [],
            redirect: false,
        }
    }

    componentDidMount() {
        let arr = [];
        for (let index = 0; index < 10; index++) {
            arr.push({name : "UNO" , value : GAMES_ENUM.UNO , descr: "je suis la description" , key : index});
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
                        <div key={value.key}>
                            <h1>{value.name}</h1>
                            <p>{value.descr}</p>
                            <button type="primary" onClick={() => this.handleGameSelect(value.value)}>
                                Jouer
                            </button>
                        </div>
                    )
                })}
            </div>
        )
    }
}


export default GameListPage;
