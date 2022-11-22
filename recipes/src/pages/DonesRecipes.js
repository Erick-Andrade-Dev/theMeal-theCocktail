import React, { useState } from 'react';
import HeaderSearch from '../components/search/Header';
import CardDone from '../components/CardDone';
import '../css/DoneRecipes.css'

export default function DoneRecipe() {
  const [typeSelect, setType] = useState(false);
  let loadFav = JSON.parse(localStorage.getItem('doneRecipes'));
  loadFav = !loadFav ? [] : loadFav;
  return (
    <div>
      <HeaderSearch title={'Receitas Feitas'} showTop="true" />
      <div className="btns-recipes-done">
        <button
          className="button-done"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={() => setType(false)}
        >
          All
        </button>
        <button
          className="button-done"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={() => setType('comida')}
        >
          Food
        </button>
        <button
          className="button-done"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={() => setType('bebida')}
        >
          Drinks
        </button>
        {loadFav
          .filter((el) => (typeSelect ? el.type === typeSelect : true))
          .map((el, index) => (
            <CardDone key={index} item={el} index={index} />
            ))}
      </div>
    </div>
  );
}