import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Menu from '../components/Menu';
import ListRecipe from '../components/ListRecipe';
import SearchHeader from '../components/search/SearchHeader';
import ReceitasContext from '../context/ReceitasContext';
import {
  ApiSearchMealByName,
  searchMealByCategory,
  searchMealCategory,
} from '../services/foodApi';
import {
  searchCockTailByCategory,
  searchCockTailByName,
  searchCockTailCategory,
} from '../services/drinksApi';
import '../css/Main.css'

function haveRecipes(receitas, tipo, id, automaticRedirection) {
  if (typeof receitas !== 'object' || !receitas) return null;
  if (receitas.length === 1 && automaticRedirection) {
    return <Redirect to={`/${tipo}/${receitas[0][id]}`} />;
  } else if (receitas.length === 0) {
    return null;
  }
  return (
    <div>
      <ListRecipe />
    </div>
  );
}
async function filterButton(setCategorias, tipo) {
  if (tipo === 'comidas') {
    await searchMealCategory().then((el) =>
      setCategorias(['All', ...el.filter((_, i) => i < 5).map((e) => e.strCategory)]),
    );
  } else {
    await searchCockTailCategory().then((el) =>
      setCategorias(['All', ...el.filter((_, i) => i < 5).map((e) => e.strCategory)]),
    );
  }
}
function basicRecipes(setReceitas, tipo) {
  if (tipo === 'comidas') {
    ApiSearchMealByName('').then((el) => setReceitas(el));
  } else {
    searchCockTailByName('').then((el) => setReceitas(el));
  }
}
function filtraCategoria(tipo, selecCat, setReceitas) {
  if (tipo === 'comidas') {
    searchMealByCategory(selecCat).then((el) => {
      setReceitas(el);
    });
  } else {
    searchCockTailByCategory(selecCat).then((el) => setReceitas(el));
  }
}
function updateClicks(selecCat, setReceitas, tipo) {
  if (selecCat === '') {
    basicRecipes(setReceitas, tipo);
  } else {
    filtraCategoria(tipo, selecCat, setReceitas);
  }
}
export default function Main(props) {
  const { receitas, setReceitas, redirecionado, setRedirecionado } = useContext(ReceitasContext);
  const [categorias, setCategorias] = useState([]);
  const [selecCat, setSelecCat] = useState('');
  const [automatic, setAutomatic] = useState(false);
  const tipo = /comida/.test(props.match.path) ? 'comidas' : 'bebidas';
  const id = tipo === 'comidas' ? 'idMeal' : 'idDrink';
  useEffect(() => {
    if (!redirecionado) {
      basicRecipes(setReceitas, tipo);
    }
    filterButton(setCategorias, tipo);
  }, [tipo]);
  useEffect(() => {
    if (!redirecionado) {
      updateClicks(selecCat, setReceitas, tipo);
    }
    setRedirecionado(false);
  }, [selecCat, tipo]);
  useEffect(() => () => setSelecCat(''), [tipo]);
  return (
    <div className="container-recipes">
      <SearchHeader title={tipo} automatic={setAutomatic} />
      <div className="container-btn-recipes">
        {categorias.map((el) => (
          <button     
            className="button-filters"       
            key={ el }
            type="button"
            onClick={(e) => {
              if (e.target.innerText === 'All' || e.target.innerText === selecCat) {
                setSelecCat('');
              } else {
                setSelecCat(e.target.innerText);
              }
            }}
            data-testid={`${el}-category-filter`}
          >
            {el}
          </button>
        ))}
      </div>
      {haveRecipes(receitas, tipo, id, automatic)}
      <Menu />
    </div>
  );
}

Main.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};