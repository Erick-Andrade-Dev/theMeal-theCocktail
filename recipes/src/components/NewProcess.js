import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { convertFoodDone } from './DetailsFood'
import { imageMain, addFavorite } from './NewProcessFunction';

export function convertFavorite(details, setFavority) {
  let type = 'Drink';

  if (details.idMeal) {
    type = 'Meal';
  }
  const saida = {
    id: details[`id${type}`],
    type: type === 'Drink' ? 'bebida' : 'comida',
    category: details.strCategory,
    alcoholicOrNot: type === 'Meal' ? '' : 'Alcoholic',
    name: details[`str${type}`],
    image: details[`str${type}Thumb`],
    area: details.strArea !== undefined ? details.strArea : '',
  };
  addFavorite(saida, setFavority);
  return saida;
}

export function CopyURL() {
  const endereco = window.location.toString();
  const index = endereco.indexOf('/in-progress');
  window.navigator.clipboard.writeText(endereco.substring(0, index));
}

function funcLinks(details, favority, setFavority, copiador, copy) {
  let title = details.strMeal;
  if (details.strDrink) title = details.strDrink;
  return (
    <div className="container-title-icons">
      <h1 className="title-recipe-progress">
        {title}
      </h1>
      <div className="container-icons">
        <Link onClick={() => convertFavorite(details, setFavority)}>
          <img
            src={favority ? blackHeart : whiteHeart}
            alt="like icon"
            className="icon"
            data-testid="favorite-btn"
          />
        </Link>
        <Link
          onClick={() => {
            copiador(true);
            CopyURL();
          }}
        >
          <img src={shareIcon} alt="like icon" className="icon" data-testid={'share-btn'} />
        </Link>
        {copy ? <span>Link copiado!</span> : null}
      </div>     
    </div>
  );
}

function createBasicLocal(details) {
  const type = details.idMeal ? 'Meal' : 'Drink';
  const chave = details.idMeal ? 'meals' : 'cocktails';
  if (localStorage.getItem('inProgressRecipes') === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {}, cocktails: {} }));
  }
  return { type, chave };
}

function teste(details) {
  const { type, chave } = createBasicLocal(details);
  const localSAtual = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!localSAtual[chave][details[`id${type}`]]) return [];
  const ingredientes = localSAtual[chave][details[`id${type}`]];
  return ingredientes;
}
function funcIngredientsChecks(used, details, i) {
  return used.includes(details[`strIngredient${i}`]);
}
export function funcIngredients(ingredients, detalhes) {
  const used = teste(detalhes);
  for (let i = 1; i < 20; i += 1) {
    if (
      detalhes[`strIngredient${i}`] !== null &&
      detalhes[`strIngredient${i}`] !== '' &&
      detalhes[`strIngredient${i}`] !== undefined
    ) {
      ingredients.push({
        ingrediente: detalhes[`strIngredient${i}`],
        quantidade: detalhes[`strMeasure${i}`],
        checked: funcIngredientsChecks(used, detalhes, i),
      });
    }
  }
  return ingredients;
}

function updateUsedIngredients(details, setDone, novosIngredientes) {
  const { type, chave } = createBasicLocal(details);
  const localSAtual = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!localSAtual[chave][details[`id${type}`]]) return [];
  const ingredientes = localSAtual[chave][details[`id${type}`]];

  if (ingredientes.length === novosIngredientes.length) {
    setDone(true);
  }
  return ingredientes;
}

function changeStorage(details, final) {
  const { type, chave } = createBasicLocal(details);
  const localSAtual = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const elements = document.getElementsByClassName('ingredient-step');
  localSAtual[chave][details[`id${type}`]] = [];

  let total = 0;
  let used = 0;
  for (let i = 0; i < elements.length; i += 1) {
    total += 1;
    if (elements[i].checked === true) {
      localSAtual[chave][details[`id${type}`]].push(elements[i].id);
      used += 1;
    }
  }
  if (total === used) {
    final(true);
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(localSAtual));
}

function InputCheck(props) {
  const { item, action, details, setDone } = props;
  if (!item.checked) {
    return (
      <input
        type="checkbox"        
        id={item.ingrediente}
        onClick={() => {
          action(details, setDone);
        }}
      />
    );
  }
  return (
    <input
      type="checkbox"      
      id={item.ingrediente}
      onClick={() => {
        action(details, setDone);
      }}
      checked
    />
  );
}
InputCheck.propTypes = {
  item: propTypes.instanceOf(Object).isRequired,
  action: propTypes.func.isRequired,
  details: propTypes.instanceOf(Object).isRequired,
  setDone: propTypes.func.isRequired,
};

function moveToDone(details) {
  const { type, chave } = createBasicLocal(details);
  const localSAtual = JSON.parse(localStorage.getItem('inProgressRecipes'));
  delete localSAtual[chave][details[`id${type}`]];
  localStorage.setItem('inProgressRecipes', JSON.stringify(localSAtual));
  const temp = convertFoodDone(details, type);
  if (localStorage.getItem('doneRecipes') === null) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }
  const doneAtual = JSON.parse(localStorage.getItem('doneRecipes'));
  doneAtual.push(temp);
  

  localStorage.setItem('doneRecipes', JSON.stringify(doneAtual));
}

function Button(props) {
  const { habilita, details } = props;
  return (
    <Link to={'/receitas-feitas'}>
      <button
        className="btn-process"
        type="button"            
        disabled={ habilita }
        onClick={() => moveToDone(details) }
      >
        Finalizar receita
      </button>
    </Link>
  );
}
Button.propTypes = {
  habilita: propTypes.bool.isRequired,
  details: propTypes.instanceOf(Object).isRequired,
};

export default function NewProcess(props) {
  const { details, favoriteRecipes } = props;
  const [used, setDone] = useState(false);
  const [copy, copiador] = useState(false);
  const [favority, setFavority] = useState(false);
  useEffect(() => setFavority(favoriteRecipes), []);
  const [usedIngredients, setUsed] = useState([]);
  const novosIngredientes = funcIngredients([], details);
  useEffect(() => setUsed(updateUsedIngredients(details, setDone, novosIngredientes)), []);
  return (
    <div className="container-process-recipe">
      {imageMain(details)}
      <div className="ingredients-process">
        {funcLinks(details, favority, setFavority, copiador, copy)}
        <h3 className="title-category-progress">
          {details.strCategory}
        </h3>
        <h3 className="ingredients-list">Ingredients</h3>
        <ul className="container-checkbox-finally">
          {novosIngredientes.map((item) => (
            <div key={item}>
              <InputCheck               
                item={item}               
                action={changeStorage}
                details={details}
                setDone={setDone}
              />
              <label htmlFor={item.ingrediente}>
                {item.ingrediente}- {item.quantidade}
              </label>
            </div>
          ))}
        </ul>
        <h3 className="ingredients-list">Instructions:</h3>
        <p>
          {details.strInstructions}
        </p>
      </div>
      <Button habilita={novosIngredientes.every((el) => el.checked)} details={details} />
    </div>
  );
}

NewProcess.propTypes = {
  details: propTypes.instanceOf(Object).isRequired,
  favoriteRecipes: propTypes.func.isRequired,
};