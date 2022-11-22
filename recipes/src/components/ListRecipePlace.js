import React from 'react';
import PropTypes from 'prop-types';
import Recipes from './Recipe';

export default function ListRecipesPlace(props) {
  const { receitas } = props;
  if (!receitas) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="recipes-local">
      {receitas
        .filter((_, index) => index < 12)
        .map((receita, index) => (
          <Recipes key={index} receita={receita} index={index} />
        ))}
    </div>
  );
}

ListRecipesPlace.propTypes = {
  receitas: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
};