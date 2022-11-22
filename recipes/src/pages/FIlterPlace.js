import React, { useEffect, useState } from 'react';
import { searchMealFilterArea, searchMealArea, ApiSearchMealByName } from '../services/foodApi'
import Menu from '../components/Menu';
import HeaderSearch from '../components/search/Header';
import ListRecipe from '../components/ListRecipe';
import ListRecipesPlace from '../components/ListRecipePlace';
import '../css/ExplorerPlace.css'

function filterLocate(filtroDeLocais, setLocalSelect) {
  const localizações = ['All', ...filtroDeLocais];
  return (
    <div className="filter-local-options">
      <select
        className="filter-local"
        data-testid="explore-by-area-dropdown"
        type="ComboBox"
        name="localização"
        onChange={(event) => setLocalSelect(event.target.value)}
      >
        {localizações.map((area) => (
          <option data-testid={`${area}-option`} key={area}>
            {area}
          </option>
        ))}
      </select>
    </div>
  );
}

function haveRecipes(receitas) {
  if (!receitas) return null;
  return (
    <div className="container-recipes-place">
      <ListRecipesPlace receitas={receitas} />
    </div>
  );
}
export default function ListOfPlaces() {
  const [filtroDeLocais, setfiltroDeLocais] = useState([]);
  const [lista, setLista] = useState([]);
  const [localSelect, setLocalSelect] = useState('All');
  const [explorarLocal, setExplorarLocal] = useState(undefined);
  useEffect(() => {
    searchMealFilterArea().then((resposta) => {
      if (!resposta) return null;
      const areas = resposta.map((res) => res.strArea);
      return setfiltroDeLocais(areas);
    });
    ApiSearchMealByName('').then((el) => setLista(el));
  }, []);
  useEffect(() => {
    searchMealArea(localSelect).then((resposta) => {
      if (!resposta) return null;
      return setExplorarLocal(resposta);
    });
  }, [localSelect]);
  return (
    <div className="container-filters-places">      
      <HeaderSearch title="Explorar Origem" />
      {filterLocate(filtroDeLocais, setLocalSelect)}
      {localSelect !== 'All' ? haveRecipes(explorarLocal) : <ListRecipe receitas={ lista } />}
      <Menu />
    </div>
  );
}