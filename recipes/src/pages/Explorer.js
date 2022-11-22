import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';
import HeaderSearch from '../components/search/Header';
import '../css/Explorer.css'

export default function Explorer() {
  return (
    <div className="container-explorer">
      <HeaderSearch title={'Explorar'} showTop="true" />
      <div className="container-btns-explorer">
        <Link to="/explorar/comidas" id="explorarComidas">
          <button className="explorer-foods-drinks" type="button">Explorar Comidas</button>
        </Link>
        <Link to="/explorar/bebidas" data-testid="explore-drinks" id="explorarBebidas">
          <button className="explorer-foods-drinks" type="button">Explorar Bebidas</button>
        </Link>
      </div>
      <Menu />
    </div>
  );
}