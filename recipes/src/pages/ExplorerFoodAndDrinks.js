import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { searchMealRandom } from '../services/foodApi';
import { searchCockTailRandom } from '../services/drinksApi';
import HeaderSearch from '../components/search/Header';
import Menu from '../components/Menu'
import '../css/ExplorerFoodsAndDrinks.css'

export default function ExplorerFoodsAndDrinks(props) {
  const [exploreSurpriseMeal, setExploreSurpriseMeal] = useState(undefined);
  const [exploreSurpriseCockTail, setExploreSurpriseCockTail] = useState(undefined);
  useEffect(() => {
    searchMealRandom().then((resposta) => {
      if (!resposta) return null;
      console.log(resposta)
      return setExploreSurpriseMeal(resposta[0].idMeal);
    });
  }, []);
  useEffect(() => {
    searchCockTailRandom().then((resposta) => {
      if (!resposta) return null;
      return setExploreSurpriseCockTail(resposta[0].idDrink);
    });
  }, []);

  return /comidas/.test(props.match.path) ? (
    <div className="container-explorer-foodsDrinks">
      <HeaderSearch title={'Explorar Comidas'} showTop="true" />
      <div className="btns-explorer-foodsDrinks">
        <Link to="/explorar/comidas/ingredientes">
          <button className="btn-explorer" type="button">Por Ingredientes</button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button className="btn-explorer" type="button">Por Local de Origem</button>
        </Link>
        <Link to={ `/comidas/${exploreSurpriseMeal}` }>
          <button className="btn-explorer" type="button">Me Surpreenda!</button>
        </Link>
      </div>
      <Menu />
    </div>
  ) : (
    <div className="container-explorer-foodsDrinks">
      <HeaderSearch title={'Explorar Bebidas'} showTop="true" />
      <div className="btns-explorer-foodsDrinks">
        <Link to="/explorar/bebidas/ingredientes">
          <button className="btn-explorer" type="button">Por Ingredientes</button>
        </Link>
        <Link to={ `/bebidas/${exploreSurpriseCockTail}` }>
          <button className="btn-explorer" type="button">Me Surpreenda!</button>
        </Link>
      </div>
      <Menu />
    </div>
  );
}

ExplorerFoodsAndDrinks.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};