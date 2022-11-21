import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Recipes(props) {
  const { receita, index } = props;
  let tipo = 'comidas'
  let id = receita.idMeal;
  if ( receita.strDrink ) {
    tipo = 'bebidas'
    id = receita.idDrink;
  }
  return (
    <Link style={{textDecoration:'none'}} to={`/${tipo}/${id}`}>
      <div>
        <img   
          className="img-recipes"      
          src={receita.strMealThumb || receita.strDrinkThumb}
          alt={receita.strMeal || receita.strDrink}         
        />
        <p className="title-recipes">
          {receita.strMeal || receita.strDrink}
        </p>
      </div>
    </Link>
  );
}

Recipes.propTypes = {
  receita: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  index: PropTypes.number.isRequired,
};