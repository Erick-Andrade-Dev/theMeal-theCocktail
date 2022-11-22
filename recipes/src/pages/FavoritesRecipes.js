import React, { useState } from 'react';
import CardFavorite from '../components/CardFavorite';
import HeaderSearch from '../components/search/Header';
import '../css/FavoritesRecipes.css'

export default function FavoritesRecipes() {
  const [typeSelect, setType] = useState(false);
  let loadFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
  loadFav = !loadFav ? [] : loadFav;
  return (
    <div>
      <HeaderSearch title={'Receitas Favoritas'} showTop="true" />
      <div className="butttons-filters-favorites-recipes">
        <button
          className="butttons-favorite-recipes"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={() => setType(false)}
        >
          All
        </button>
        <button
          className="butttons-favorite-recipes"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={() => setType('comida')}
        >
          Food
        </button>
        <button
          className="butttons-favorite-recipes"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={() => setType('bebida')}
        >
          Drinks
        </button>
        {loadFav
          .filter((el) => (typeSelect ? el.type === typeSelect : true))
          .map((el, index) => (
            <CardFavorite key={index} item={el} index={index} />
          ))}
      </div>
    </div>
  );
}