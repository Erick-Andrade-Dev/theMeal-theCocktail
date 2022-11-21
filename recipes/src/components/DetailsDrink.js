import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CardRecomend from './CardRecomend';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { funcIngredients, convertFavorite, CopyURL } from './DetailsFood';

function imageDrink(details) {
  return (
    <img
      src={details.strDrinkThumb}
      alt={details.strDrink}
      className="recipe-photo"       
    />
  );
}

function ReverseArrayFoto(sugestFood, indexRecom, setIndexRecom, location) {
  if (indexRecom < 0) {
    setIndexRecom(5);
    return (
      sugestFood
        .map((item, index) => (
          <CardRecomend               
            key={item.strMeal}
            title={item.strMeal}
            index={index}
            source={item.strMealThumb}
            show={indexRecom}
            location={location}
          />
        ))
    );
  }
  return (
    sugestFood
      .map((item, index) => (
        <CardRecomend         
          key={item.strMeal}
          title={item.strMeal}
          index={index}
          source={item.strMealThumb}
          show={indexRecom}
          location={location}
          id={item.idMeal}
        />
      ))
  );
}
function isAlcoholic(details) {
  return details.strAlcoholic.indexOf('Alcoholic') >= 0 ? 'Alcoholic' : '';
}

function funcLinks(details, favority, setFavority, copy, copiador) {
  return (
    <div className="container-icons-title">
      <h1>
        {details.strDrink}
      </h1>
      <div className="container-icons">
        <Link onClick={() => convertFavorite(details, setFavority)}>
          <img           
            src={favority ? blackHeart : whiteHeart}
            alt="Favoritar"                   
          />
        </Link>    
        <Link
          onClick={ () => {
            copiador(true);
            CopyURL();
          } }
        >
          <img src={shareIcon} alt="Favoritar"/>
        </Link>
        {copy ? <p className="link-copy">Link copiado!</p> : null}
      </div>
    </div>
  );
}

export default function DetailsDrink(props) {
  const [favority, setFavority] = useState(false);
  const [copy, copiador] = useState(false);
  const {
    details,
    favoriteRecipes,
    status,
    indexRecom,
    setIndexRecom,
    sugestFood,
    idDaReceita,
    location,
  } = props;
  useEffect(() => {
    setFavority(favoriteRecipes);
  }, []);
  const ingredientes = funcIngredients([], details);
  const Alcoholic = isAlcoholic(details);
  return (
    <div className="container-img-recipe">
      <div className="container-img">
        {imageDrink(details)}
      </div>
      <div className="details-recipes">
        {funcLinks(details, favority, setFavority, copy, copiador)}
        <h5 className="isAlcoholic">
          {`${details.strCategory}-${Alcoholic}`}
        </h5>
        <h3 className="title-ingredients">Ingredients</h3>
        <ul className="list-ingredients">
          {' '}
          {ingredientes.map((item, index) => (
            <li key={item.ingrediente} data-testid={`${index}-ingredient-name-and-measure`}>
              {item.ingrediente}- {item.quantidade}
            </li>
          ))}
        </ul>
        <h3 className="title-instructions">Instructions:</h3>
        <p className="instructions" data-testid="instructions">
          {details.strInstructions}
        </p>
        <h3 className="title-recomendation">Recomendações</h3>
        <div className="container-sugestions">
          <div className="arrow-sugestion" onClick={() => setIndexRecom(indexRecom - 1)}>
            {'<'}
          </div>
          {ReverseArrayFoto(sugestFood, indexRecom, setIndexRecom, location)}
          <div className="arrow-sugestion" onClick={() => setIndexRecom(indexRecom + 1)}>
            {'>'}
          </div>
        </div>
      </div>
      <div style={{display:'flex', justifyContent:'center'}}>
        {status === 'done' ? null : (
          <Link to={`/bebidas/${idDaReceita}/in-progress`}>
            <button className="button-start-recipe" type="button" data-testid="start-recipe-btn">
              {status === 'nothing' ? 'Inicia Receita' : 'Continuar Receita'}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

DetailsDrink.propTypes = {
  details: propTypes.instanceOf(Object).isRequired,
  favoriteRecipes: propTypes.func.isRequired,
  status: propTypes.string.isRequired,
  indexRecom: propTypes.number.isRequired,
  setIndexRecom: propTypes.func.isRequired,
  sugestFood: propTypes.arrayOf(propTypes.instanceOf(Object)).isRequired,
  idDaReceita: propTypes.number.isRequired,
  location: propTypes.string.isRequired,
};