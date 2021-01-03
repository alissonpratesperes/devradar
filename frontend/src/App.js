import React from 'react';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
  return (
    <div id="app">
      <aside>
        <strong> Cadastrar </strong>
          <form>
            <div className="input-block">
              <label htmlFor="github_username"> Usuário do GitHub </label>
                <input name="github_username" id="github_username"/>
            </div>
            <div className="input-block">
              <label htmlFor="techs"> Tecnologias </label>
                <input name="techs" id="techs" required/>
            </div>
              <div className="input-group">
                <div className="input-block">
                  <label htmlFor="latitude"> Latitude </label>
                    <input name="latitude" id="latitude" required/>
                </div>
                <div className="input-block">
                  <label htmlFor="longitude"> Longitude </label>
                  <input name="longitude" id="longitude" required/>
                </div>
              </div>
                <button type="submit"> Salvar </button>
          </form>
      </aside>
        <main>
          <ul>
            <li className="dev-item">
              <header>
                <img src="https://avatars1.githubusercontent.com/u/52282116?s=460&u=4b1ca632b207c0133a3546fc41f5572f856b1065&v=4" alt="Alisson Prates Peres"/>
                  <div className="user-info">
                    <strong> Alisson Prates Peres </strong>
                      <span> NodeJS, ReactJS, React Native </span>
                  </div>
              </header>
                <p> code the world </p>
                  <a href="https://github.com/alissonpratesperes"> Acessar Perfil no GitHub </a>
            </li>
            <li className="dev-item">
              <header>
                <img src="https://avatars1.githubusercontent.com/u/52282116?s=460&u=4b1ca632b207c0133a3546fc41f5572f856b1065&v=4" alt="Alisson Prates Peres"/>
                  <div className="user-info">
                    <strong> Alisson Prates Peres </strong>
                      <span> NodeJS, ReactJS, React Native </span>
                  </div>
              </header>
                <p> code the world </p>
                  <a href="https://github.com/alissonpratesperes"> Acessar Perfil no GitHub </a>
            </li>
            <li className="dev-item">
              <header>
                <img src="https://avatars1.githubusercontent.com/u/52282116?s=460&u=4b1ca632b207c0133a3546fc41f5572f856b1065&v=4" alt="Alisson Prates Peres"/>
                  <div className="user-info">
                    <strong> Alisson Prates Peres </strong>
                      <span> NodeJS, ReactJS, React Native </span>
                  </div>
              </header>
                <p> code the world </p>
                  <a href="https://github.com/alissonpratesperes"> Acessar Perfil no GitHub </a>
            </li>
            <li className="dev-item">
              <header>
                <img src="https://avatars1.githubusercontent.com/u/52282116?s=460&u=4b1ca632b207c0133a3546fc41f5572f856b1065&v=4" alt="Alisson Prates Peres"/>
                  <div className="user-info">
                    <strong> Alisson Prates Peres </strong>
                      <span> NodeJS, ReactJS, React Native </span>
                  </div>
              </header>
                <p> code the world </p>
                  <a href="https://github.com/alissonpratesperes"> Acessar Perfil no GitHub </a>
            </li>
          </ul>
        </main>
    </div>
  );
}

export default App;
