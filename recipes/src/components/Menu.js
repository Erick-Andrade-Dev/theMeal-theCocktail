import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

export default function Menu() {
  return (
    <footer className="footer">
      <Link to="/comidas">
        <img 
          className="icon-menu-top"        
          alt="Comidas"
          src={mealIcon}
        />
      </Link>
      <Link to="/explorar">
        <img      
          className="icon-menu-top"   
          alt="Explorar comidas ou bebidas"
          src={exploreIcon}
          />
      </Link>
      <Link to="/bebidas">
        <img    
          className="icon-menu-top"     
          alt="Bebidas"
          src={drinkIcon}
          />
      </Link>
    </footer>
  )
}