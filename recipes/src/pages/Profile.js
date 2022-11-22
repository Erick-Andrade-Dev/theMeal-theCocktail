import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';
import HeaderSearch from '../components/search/Header';
import '../css/Profile.css'

export default function Profile() {
  let email = JSON.parse(localStorage.getItem('user'));
  email = !email ? { email: '' } : email;
  return (
    <div>
      <HeaderSearch title={'Perfil'} showTop="true" />
      <div className="infos-perfil">
        <p className="email-person">
         Email: {email.email}
        </p>
        <Link to="/receitas-feitas" id="receitasFeitas">
          <button className="button-perfil" type="button">Receitas Feitas</button>
        </Link>
        <Link to="/receitas-favoritas" id="receitasFavoritas">
          <button className="button-perfil" type="button">Receitas Favoritas</button>
        </Link>
        <Link to="/" id="Sair">
          <button className="button-perfil" type="button" onClick={() => localStorage.clear()}>
            Sair
          </button>
        </Link>
      </div>
      <Menu />
    </div>
  );
}