import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import CardRecomend from './CardRecomend';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export function convertFoodDone(food, tipo) {
  const saida = {
    id: food[`id${tipo}`],
    type: tipo === 'Meal' ? 'comida' : 'bebida',
    area: food.strArea,
    category: food.strCategory,
    alcoholicOrNot: !food.strAlcoholic ? 'Not' : food.strAlcoholic,
    name: food[`str${tipo}`],
    image: food[`str${tipo}Thumb`],
    doneDate: new Date().toLocaleDateString(),
    tags: [food.strTags],
  };
  return saida;
}

function imageFood(details) {
  return (
    <img
      src={details.strMealThumb}
      alt={details.strMeal}
      className="recipe-photo"    
    />
  );
}

function addFavority(receita, setFavority) {
  let oldFav = localStorage.getItem('favoriteRecipes');
  if (!oldFav) {
    setFavority(true);
    return localStorage.setItem('favoriteRecipes', JSON.stringify([receita]));
  }
  oldFav = [...JSON.parse(oldFav)];
  if (oldFav.find((el) => el.id === receita.id)) {
    setFavority(false);
    return localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(oldFav.filter((el) => el.id !== receita.id))
    );
  }
  const temp = [...oldFav, receita];
  setFavority(true);
  return localStorage.setItem('favoriteRecipes', JSON.stringify(temp));
}

export function convertFavorite(food, setFavority) {
  let type = 'Drink';

  if (food.idMeal) {
    type = 'Meal';
  }
  const saida = {
    id: food[`id${type}`],
    type: type === 'Drink' ? 'bebida' : 'comida',
    category: food.strCategory,
    alcoholicOrNot: type === 'Meal' ? '' : 'Alcoholic',
    name: food[`str${type}`],
    image: food[`str${type}Thumb`],
    area: food.strArea !== undefined ? food.strArea : '',
  };
  addFavority(saida, setFavority);
  return saida;
}

export function loopIndex(indexArr, IndexAtual) {
  let index = indexArr;
  if (indexArr < 0) index = 5;
  return index % 6 === IndexAtual % 6;
}

function ReverseArrayFoto(sugestDrink, indexRecom, setIndexRecom, location) {
  if (indexRecom < 0) {
    setIndexRecom(5);
    return sugestDrink.map((item, index) => (
      <CardRecomend        
        key={item.strDrink}
        title={item.strDrink}
        index={index}
        source={item.strDrinkThumb}
        show={indexRecom}
        id={item.idDrink}
      />
    ));
  }
  return (
    sugestDrink
      .map((item, index) => (
        <CardRecomend
          key={item.strDrink}
          title={item.strDrink}
          index={index}
          source={item.strDrinkThumb}
          show={indexRecom}
          location={location}
          id={item.idDrink}
        />
      ))
  );
}

export function funcIngredients(ingredientes, details) {
  for (let i = 1; i < 20; i += 1) {
    if (
      details[`strIngredient${i}`] !== null &&
      details[`strIngredient${i}`] !== '' &&
      details[`strIngredient${i}`] !== undefined
    ) {
      ingredientes.push({
        ingrediente: details[`strIngredient${i}`],
        quantidade: details[`strMeasure${i}`],
      });
    }
  }
  return ingredientes;
}

export function CopyURL() {
  window.navigator.clipboard.writeText(window.location.toString());
}
function funcLinks(details, favority, setFavority, copiador, copy) {
  return (
    <div className="container-icons-title">
      <h1>
        {details.strMeal}
      </h1>
      <div className="container-icons">
        <Link onClick={() => convertFavorite(details, setFavority)}>
          <img
            className="icon-favorite"
            src={favority ? blackHeart : whiteHeart}
            alt="like icon"
            data-testid="favorite-btn"
          />
        </Link>      
        <Link
          onClick={ () => {
            copiador(true);
            CopyURL();
          } }
        >
          <img src={shareIcon} alt="Favoritar" />
        </Link>        
        <div>
          {copy ? <p className="link-copy">Link copiado!</p> : null}
        </div>        
      </div>
    </div>
  );
}
function categoryRecipe(details) {
  return (
    <h5 className="category-recipe">
      {details.strCategory}
    </h5>
  );
}
export default function DetaislFood(props) {
  const [favority, setFavority] = useState(false);
  const [copy, copiador] = useState(false);
  const {
    details,
    favoriteRecipes,
    status,
    indexRecom,
    setIndexRecom,
    sugestDrink,
    idDaReceita,
    location,
  } = props;
  useEffect(() => setFavority(favoriteRecipes), []);
  const novosIngredientes = funcIngredients([], details);
  return (
    <div className="container-img-recipe">
      <div className="container-img">
        {imageFood(details)}
      </div>      
      <div className="details-recipes">
        {funcLinks(details, favority, setFavority, copiador, copy)}
        {categoryRecipe(details)}
        <h3 className="title-ingredients">Ingredientes</h3>
        <ul className="list-ingredients">
          {novosIngredientes.map((item, index) => (
            <li key={item.ingrediente} data-testid={`${index}-ingredient-name-and-measure`}>
              {item.ingrediente}- {item.quantidade}
            </li>
          ))}
        </ul>
        <h3 className="title-instructions">Instruções:</h3>
        <p className="instructions" data-testid="instructions">
          {details.strInstructions}
        </p>
        <h3 className="videoplayer">Video</h3>
        <ReactPlayer url={details.strYoutube} data-testid="video" width="100%" height="100" />
        <h3 className="title-recomendation">Recomendações</h3>
        <div className="container-sugestions">
          <div onClick={() => setIndexRecom(indexRecom - 1)} className="arrow-sugestion">
            {'<'}
          </div>
          {ReverseArrayFoto(sugestDrink, indexRecom, setIndexRecom, location)}
          <div onClick={() => setIndexRecom(indexRecom + 1)} className="arrow-sugestion">
            {'>'}
          </div>
        </div>
      </div>
      <div style={{display:'flex', justifyContent:'center'}}>
        {status === 'done' ? null : (
          <Link 
            to={`/comidas/${idDaReceita}/in-progress`}        
          >
            <button className="button-start-recipe">
              {status === 'nothing' ? 'Inicia Receita' : 'Continuar Receita'}
            </button>
          </Link>
        )}
      </div>     
    </div>
  );
}

DetaislFood.propTypes = {
  details: propTypes.instanceOf(Object).isRequired,
  favoriteRecipes: propTypes.func.isRequired,
  status: propTypes.string.isRequired,
  indexRecom: propTypes.number.isRequired,
  setIndexRecom: propTypes.func.isRequired,
  sugestDrink: propTypes.arrayOf(propTypes.instanceOf(Object)).isRequired,
  idDaReceita: propTypes.number.isRequired,
  location: propTypes.string.isRequired,
};