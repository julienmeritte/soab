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
            <div class="container-fluid">
                <div class="px-lg-5">
                    <div class="row">
                {ListGame.map((value, index) => {
                    return (
                        <div class="col-xl-3 col-lg-4 col-md-6 mb-4" key={value.key}>
                            <div class="bg-white rounded shadow-sm" onClick={() => this.handleGameSelect(value.value)}>
                                <img src={value.picture} alt="" class="img-fluid card-img-top size-img"/>
                                <div class="p-4">
                                    <h5> <a href="#" class="text-dark">{value.name}</a></h5>
                                    <p class="small text-muted mb-0 size">{value.description}</p>
                                    <div class="d-flex align-items-center justify-content-between rounded-pill bg-light px-3 py-2 mt-4">
                                        <p class="small mb-0"><i class="fa fa-picture-o mr-2"></i><span class="font-weight-bold">Jeu de cartes</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                    </div>
               </div>
            </div>
        )
    }
}


export default GameListPage;
