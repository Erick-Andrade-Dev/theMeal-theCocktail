import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import userLogo from '../../images/profileIcon.svg';
import searchLogo from '../../images/searchIcon.svg';
import ReceitasContext from '../../context/ReceitasContext';

function firstUpCase(texto = '') {
  let palavras = texto.split(' ');
  palavras = palavras.map((palavra) => {
    const first = palavra[0].toUpperCase();
    const rest = palavra.slice(1);
    return first + rest;
  });
  return palavras.join(' ');
}

export default function HeaderSearch(props) {
  const { showSearch, setShowSearch, title, showTop } = props
  const { setTitle } = useContext(ReceitasContext);
  useEffect(() => {
    setTitle(title)
  },[title])

  const newTitle = firstUpCase(title)

  return (
    <div className="icons-menu-top">
      <Link to="/perfil">
        <img 
          className="icon-menu-top"
          src={userLogo}
          alt="Perfil"          
        />
      </Link>
      <div>
        <span className="title-menu-top">{newTitle}</span>
      </div>
      <div style={{
        visibility: showTop? 'hidden' : 'visible'
      }}>
        <Link onClick={ () => setShowSearch(!showSearch)}>
          <img 
            className="icon-menu-top"
            src={searchLogo} 
            alt="Search Logo" 
          />
        </Link>        
      </div>
    </div>
  )
}

HeaderSearch.propTypes = {
  title: PropTypes.string,
  showSearch: PropTypes.bool,
  setShowSearch: PropTypes.func,
  showTop: PropTypes.bool,
}.isRequired;