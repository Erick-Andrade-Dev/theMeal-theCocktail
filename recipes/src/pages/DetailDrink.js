import React, { useEffect, useState, useContext } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { searchCockTailById } from '../services/drinksApi';
import DetailsDrink from '../components/DetailsDrink';
import ReceitasContext from '../context/ReceitasContext';
import { updateStatus } from '../pages/DetailFood';


export default function DetailDrink(props) {
  const { sugestFood } = useContext(ReceitasContext);
  const [details, setDetails] = useState(undefined);
  const [indexRecom, setIndexRecom] = useState(0);
  const [status, setStatus] = useState('nothing');
  const [favorite, setFavoriteRecipes] = useState(false);
  const { id_da_receita: idDaReceita } = props.match.params;
  useEffect(() => {
    searchCockTailById(idDaReceita).then((resposta) => {
      setDetails(resposta[0]);
    });
    updateStatus(idDaReceita, setStatus, setFavoriteRecipes, 'cocktails');
  }, []);
  if (!details) {
    return <h1>Carregando</h1>;
  }
  return (
    <div>     
      <DetailsDrink
        details={details}
        favoriteRecipes={favorite}
        status={status}
        indexRecom={indexRecom}
        setIndexRecom={setIndexRecom}
        sugestFood={sugestFood}
        idDaReceita={idDaReceita}
        match={props.match}
        location={props.location}
      />
       <Link onClick={() => props.history.goBack()} className="btn-goBack">
        Voltar
      </Link>
    </div>
  );
}

DetailDrink.propTypes = {
  match: propTypes.shape({ params: propTypes.number.isRequired }).isRequired,
  location: propTypes.string.isRequired,
};