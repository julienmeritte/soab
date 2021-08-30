import React from "react";
import "../../../config/app.url.json";
import './HomePage.scss';

function HomePage() {
  let user = sessionStorage.getItem("name");
  return (
    <div className={'home-page'}>
      <div class="d-flex  justify-content-center pb-5">
        <h1 >Bonjour {user ? user : 'invité'}</h1>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <h1><b className={'color-blue'}>Rejoignez</b> la plus grande table de jeux de société au <b className={'color-blue'}>monde</b>.</h1>
            <p>Sans téléchargement, directement depuis votre navigateur. Avec vos amis et des milliers de joueurs du monde entier. Gratuitement.</p>
          </div>
          <div class="col-sm">
            <img className={'fade-in'} src="./img_plateau.jpg"/>
          </div>

        </div>
      </div>
      <br/>
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <img className={'l-animation'} src="./multi_home.jpg"/>
          </div>
          <div class="col-sm">
            <h1 className={'color-purple'}>Prenez le temps de jouer.</h1>
            <h1 className={'color-green'}>En temps réel ou en tour par tour.</h1>
            <p><b>Durant la pause de midi ? Un moment dans les transports ?</b></p>
            <p><b>Tranquillement à la maison ?</b></p>
            <p><b>Seul ou avec vos amis ?</b></p>
          </div>
          

        </div>
      </div>
    </div>
  );
}

export default HomePage;
