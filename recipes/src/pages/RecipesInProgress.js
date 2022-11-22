import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { searchMealById } from '../services/foodApi';
import { searchCockTailById } from '../services/drinksApi';
import { favoriteRecipes  } from './DetailFood';
import NewProcess from '../components/NewProcess';
import '../css/RecipesInProgress.css'

export function updateStatus(id, setFavoriteRecipes) {
  favoriteRecipes(setFavoriteRecipes, id);
  return null;
}
export default function RecipesInProgress(props) {
  const [details, setDetails] = useState(undefined);
  const [favorite, setFavorite] = useState(false);
  const { id_da_receita: idDaReceita } = props.match.params;
  useEffect(() => {
    if (props.location.pathname.includes('comida')) {
      searchMealById(idDaReceita).then((resposta) => {
        if (!resposta) {
          return null;
        }
        return setDetails(resposta[0]);
      });
    } else {
      searchCockTailById(idDaReceita).then((resposta) => {
        if (!resposta) {
          return null;
        }
        return setDetails(resposta[0]);
      });
    }
    updateStatus(idDaReceita, setFavorite, 'meals');
  }, []);
  if (!details) {
    return <h1>Carregando . . .</h1>;
  }
  return <NewProcess details={details} favoriteRecipes={favorite} idDaReceita={idDaReceita} />;
}
RecipesInProgress.propTypes = {
  match: PropTypes.shape({ params: PropTypes.number.isRequired }).isRequired,
  location: PropTypes.string.isRequired,
};