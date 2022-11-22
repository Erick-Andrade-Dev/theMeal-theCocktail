import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { searchMealsByListOfIngredient } from '../services/foodApi';
import { searchCockTailByListOfIngredient } from '../services/drinksApi';
import ReceitasContext from '../context/ReceitasContext';
import Menu from '../components/Menu';
import HeaderSearch from '../components/search/Header';
import CardIngredient from '../components/cards/CardIngredient';
import '../css/FilterByIngredient.css'

function startList(tipo, setLista) {
  if (tipo === 'comidas') {
    searchMealsByListOfIngredient().then((resposta) => {
      if (!resposta) {
        return null;
      }
      return setLista(resposta);
    });
  } else {
    searchCockTailByListOfIngredient().then((resposta) => {
      if (!resposta) {
        return null;
      }
      return setLista(resposta);
    });
  }
}

export default function FilterByIngredient(props) {
  const { funcBusca, setRedirecionado } = useContext(ReceitasContext);
  const tipo = /comida/.test(props.match.path) ? 'comidas' : 'bebidas';
  const [lista, setLista] = useState([]);
  useEffect(() => {
    startList(tipo, setLista);
  }, []);
  if (typeof lista !== 'object') {
    return null;
  }
  return (
    <div>
      <HeaderSearch title={'Explorar Ingredientes'} showTop="true" />
      <div className="explorer-ingredients">
        {!lista ? null : lista
          .filter((_, index) => index < 12)
          .map((el, index) => {
            const ingrediente = tipo === 'comidas' ? el.strIngredient : el.strIngredient1;
            return (
              <Link
                className="title-ingredient-foodsDrinks"
                key={ index }
                to={`/${tipo}`}
                onClick={() => {
                  if (tipo === 'comidas') {
                    funcBusca(tipo, ingrediente);
                  } else {
                    funcBusca(tipo, ingrediente);
                  }
                  setRedirecionado(true);
                }}
              >
                <CardIngredient
                  key={ index }
                  index={index} title={tipo === 'comidas' ? ingrediente : el.strIngredient1}
                  image={
                    tipo === 'comidas'
                      ? `https://www.themealdb.com/images/ingredients/${el.strIngredient}-Small.png`
                      : `https://www.thecocktaildb.com/images/ingredients/${el.strIngredient1}-Small.png `
                  }
                />
              </Link>
            );
          })}
      </div>
      <div className="menu-bottom">
        <Menu />
      </div>
    </div>
  );
}

FilterByIngredient.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};